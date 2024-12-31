import mongoose, { isObjectIdOrHexString, isValidObjectId, mongo } from "mongoose";
import Property from "../DB/Schema/PropertySchema.js";
import Tenants from "../DB/Schema/TenantsSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import user from "../DB/Schema/userSchema.js";
import { config } from 'dotenv';
import { generateAttachments, generatePdfFromHtml, getDate } from "../Utils/CommonFunctions.js";
import EmailTempelates from "../Utils/EmailTempelate.js";
import sendMail from "../Utils/email.service.js";
import { getDocumentModule } from "../Models/DocumentModel.js";
import { EmailLog } from "../DB/Schema/EmailLogSchema.js";
import logUserAction from "./ActivityController.js";
import Template from "../DB/Schema/TemplateSchema.js";
import { GeneratePdf } from "../Models/GeneratePdfModel.js";
import RSL from "../DB/Schema/RSLSchema.js";
import { Worker } from 'worker_threads';
import path from 'path';
import { __dirname } from '../../index.js'

// const workerPool = new WorkerPool(3);

export const AddTenants = async (req, res) => {
    try {
        const { _id, property, room, ...data } = req.body;
        let rentproperty = await Property.findById(property).lean();
        let tenant;
        if (_id) {
            tenant = await Tenants.findByIdAndUpdate(_id, data, { new: true, upsert: true });
            if (!tenant) {
                return res.status(404).json({ success: false, message: 'Tenant not found to update' });
            } else {
                await logUserAction(data?.addedBy, 'EDIT', {
                    fname: data?.firstName,
                    lname: data?.lastName,
                    room: room,
                    address: rentproperty?.address,
                    area: rentproperty?.area,
                    city: rentproperty?.city,
                    postCode: rentproperty?.postCode
                }, 'Tenant', _id, req.query.addedByModel);
                return res.status(200).json({ success: true, message: 'Tenant updated' });
            }
        } else {

            // Function to generate mail options dynamically

            if (!property) {
                return res.status(400).json({ success: false, message: 'Property ID is required' });
            }
            if (!data.firstName || !data.lastName) {
                return res.status(400).json({ success: false, message: 'First name and last name are required for the tenant' });
            }
            let checkroom = await Tenants.findOne({ isSignOut: 0, room: room, property })
            if (checkroom) {
                // console.log(checkroom)
                return res.status(400).json({ success: false, message: 'This Room Already Occupied' });
            }

            tenant = new Tenants({ ...data, property, room });
            const newTenant = await tenant.save();
            await logUserAction(data?.addedBy, 'ADD', {
                fname: data?.firstName,
                lname: data?.lastName,
                room: room,
                councilTaxPayer: rentproperty.councilTaxPayer,
                address: rentproperty?.address,
                area: rentproperty?.area,
                city: rentproperty?.city,
                postCode: rentproperty?.postCode
            }, 'Tenant', newTenant?._id, req.query.addedByModel);
            let userData = {}
            let rslData = await RSL.findById(rentproperty?.rslTypeGroup).select('companyname address area city').lean()
            if (['company-agent', 'staff'].includes(data?.addedByRole)) {
                let staffdata = await Staff.findById(data?.addedBy).populate({ path: 'addedBy', select: 'emailcc emailto' }).lean()
                userData = { user_id: staffdata?.addedBy?._id, ...staffdata?.addedBy, ...rslData }
            } else {
                let agentData = await user.findById(data?.addedBy).select('emailcc emailto').lean()
                userData = { user_id: agentData?._id, ...agentData, ...rslData }
            }
            const pdfTemplets = await Template.find({ rsl: new mongoose.Types.ObjectId(rentproperty?.rslTypeGroup) })
            const attachmentsArray = await Promise.all(
                pdfTemplets.map(async (pdfTemplet) => {
                    const pdfBuffer = await GeneratePdf(pdfTemplet?._id, newTenant?._id);
                    return {
                        filename: pdfTemplet?.name,
                        content: pdfBuffer,
                        contentType: 'application/pdf',
                    };
                })
            );

            const mailObj = {
                replyTo: userData?.emailto,
                to: userData?.emailto,
                bcc: userData?.emailcc,
                subject: `New Signup, ${rentproperty?.address}, ${rentproperty?.area}, ${rentproperty?.city}, ${rentproperty?.postCode}, ${newTenant?.firstName || ''} ${newTenant?.middleName || ''} ${newTenant?.lastName || ''}, ${getDate(newTenant?.dateOfBirth)}, ${newTenant?.nationalInsuranceNumber}, ${getDate(newTenant?.dateOfBirth)}, Housing Benefit Form`,
                html: EmailTempelates("new_tanant", newTenant),
                attachments: [...attachmentsArray],
            };

            await sendMail(mailObj);

            const log = new EmailLog({
                userId: ['company-agent', 'staff'].includes(data?.addedByRole) ? userData?.user_id : userData?.user_id,
                subject: mailObj?.subject,
                body: mailObj?.html,
                attachments: mailObj?.attachments.map(attachment => attachment.filename).join(', '),
                emailTo: mailObj?.to,
                emailCC: mailObj?.bcc,
            });
            await log.save();




            // let workerData = JSON.stringify({ userData, newTenant, rentproperty, pdfTemplets })
            // const worker = new Worker(path.join(__dirname, 'src', 'WorkerServices', 'Worker.js'));
            // worker.postMessage(workerData);

            // worker.on('message', (message) => {
            //     console.log('Worker finished task:', message);
            // });

            // worker.on('error', (error) => {
            //     console.error('Worker error:', error);
            // });

            // worker.on('exit', (code) => {
            //     if (code !== 0) {
            //         console.error(`Worker stopped with exit code ${code}`);
            //     }
            // });
            // await workerPool.runTask(workerData)
            // await workerPool.runTask({
            //     userData,
            //     newTenant,
            //     rentproperty
            // })
            // const pdfTemplets = await Template.find({ rsl: new mongoose.Types.ObjectId(rentproperty?.rslTypeGroup) })
            // const mailsArray = []
            // for (let template of pdfTemplets) {
            //     mailsArray.push({ emailType: 'new_tanant', filename: template?.name, tempId: template?._id })
            // }
            // for (const mail of mailsArray) {
            //     await ProcessTenant(userData, newTenant, mail?.filename, mail?.emailType, mail?.tempId)
            // }
        }


        if (property && tenant._id) {

            if (!rentproperty) {
                return res.status(404).json({ success: false, message: 'Property not found' });
            }


            await Property.updateOne(
                { _id: property },
                [
                    {
                        $set: {
                            tenants: {
                                $cond: {
                                    if: {
                                        $anyElementTrue: {
                                            $map: {
                                                input: "$tenants",
                                                as: "tenant",
                                                in: { $eq: ["$$tenant.roomNo", room] },
                                            },
                                        },
                                    },
                                    then: {
                                        $map: {
                                            input: "$tenants",
                                            as: "tenant",
                                            in: {
                                                $cond: [
                                                    { $eq: ["$$tenant.roomNo", room] },
                                                    {
                                                        $mergeObjects: [
                                                            "$$tenant",
                                                            {
                                                                tenant_id: tenant._id,
                                                                signInDate: data.signInDate,
                                                                endDate: data.endDate,
                                                            },
                                                        ],
                                                    },
                                                    "$$tenant",
                                                ],
                                            },
                                        },
                                    },
                                    else: {
                                        $concatArrays: [
                                            "$tenants",
                                            [
                                                {
                                                    tenant_id: tenant._id,
                                                    roomNo: parseInt(room),
                                                    signInDate: data.signInDate,
                                                    endDate: data.endDate,
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                        },
                    },
                ]
            );

            res.status(200).json({
                success: true,
            });
        }

    } catch (error) {
        // if (error.code === 11000) {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'Email already exists',
        //     });
        // }
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Failed to add or update tenant',
            error: error.message || 'Internal server error',
        });

    }
};

export const ListTenents = async (req, res) => {

    try {
        // Extract query parameters
        const { page = 1, limit = 10, search = '', addedBy: _id, fromDate, toDate, role } = req.query;
        const searchConditions = search
            ? {
                $or: [
                    { address: { $regex: search, $options: 'i' } },
                    { area: { $regex: search, $options: 'i' } },
                    { city: { $regex: search, $options: 'i' } },
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { middleName: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        let query;
        if (fromDate || toDate) {
            searchConditions.$or = [
                { createdAt: { $gte: new Date(fromDate) } },
                { createdAt: { $lte: new Date(toDate) } }
            ]
        }

        if (['agent', 'company'].includes(role)) {
            const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
            const staffIds = staffMembers.map(staff => staff._id);

            query = {
                $and: [
                    { isSignOut: 0 },
                    searchConditions,
                    {
                        $or: [
                            { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'User' },
                            { addedBy: { $in: staffIds }, addedByModel: 'Staff' }
                        ]
                    }
                ]
            };
        } else if (['staff', 'company-agent'].includes(role)) {

            const staffMembers = await Staff.findOne({ _id }).select('permission').lean();
            if (!staffMembers?.permission.includes(5)) {
                return res.status(403).json({ message: 'Access Denied', success: false });
            }
            query = {
                $and: [
                    { isSignOut: 0 },
                    searchConditions,
                    { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'Staff' }
                ]
            };
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const tenants = await Tenants.aggregate([
            { $match: query },

            {
                $lookup: {
                    from: 'properties',
                    localField: 'property',
                    foreignField: '_id',
                    as: 'propertyDetails'
                }
            },

            { $unwind: { path: "$propertyDetails", preserveNullAndEmptyArrays: true } },
            { $match: searchConditions },
            {
                $project: {
                    addedBy: 1,
                    firstName: 1,
                    lastName: 1,
                    middleName: 1,
                    dateOfBirth: 1,
                    room: 1,
                    signInDate: 1,
                    endDate: 1,
                    createdAt: 1,
                    addedByModel: 1,
                    claimReferenceNumber: 1,
                    nationalInsuranceNumber: 1,
                    'propertyDetails._id': 1,
                    'propertyDetails.address': 1,
                    'propertyDetails.area': 1,
                    'propertyDetails.city': 1
                }
            },

            { $sort: { createdAt: -1 } },

            { $skip: (pageNum - 1) * limitNum },

            { $limit: limitNum }
        ]);
        const modifydata = await Promise.all(
            tenants.map(async (item) => {
                let addedByData;
                if (['Staff'].includes(item.addedByModel)) {
                    addedByData = await Staff.findOne({ _id: item.addedBy }).select('username _id role').populate({ path: 'addedBy', select: 'role' });
                    return {
                        ...item,
                        property: `${item.propertyDetails?.address}, ${item.propertyDetails?.area}, ${item.propertyDetails?.city}`,
                        addedByusername: addedByData?.username,
                        addedbyrole: addedByData?.role,
                        addedByData,
                        claimReferenceNumber: item?.claimReferenceNumber === ('' || undefined) ? "No" : item?.claimReferenceNumber
                    };
                } else if (['User'].includes(item.addedByModel)) {
                    addedByData = await user.findOne({ _id: item.addedBy }).select('username _id role fname lname companyname').populate({ path: 'addedBy', select: 'role' })
                    return {
                        ...item,
                        property: `${item.propertyDetails?.address}, ${item.propertyDetails?.area}, ${item.propertyDetails?.city}`,
                        addedByusername: ['company'].includes(addedByData?.role) ? addedByData?.companyname : addedByData.fname + " " + addedByData.lname,
                        addedbyrole: addedByData?.role,
                        addedByData,
                        claimReferenceNumber: item?.claimReferenceNumber === ('' || undefined) ? "No" : item?.claimReferenceNumber
                    };
                }

            })
        );



        const total = await Tenants.countDocuments(query);

        if (!tenants || tenants.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tenants found matching the criteria.',
                data: [],
                pagination: {
                    total: 0,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: 0
                }
            });
        }
        res.status(200).json({
            success: true,
            message: 'Tenants fetched successfully.',
            data: modifydata,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tenants',
            error: error.message
        });
    }
}

export const signOutTenantList = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', addedBy: _id, fromDate, toDate, role } = req.query;
        const searchConditions = search
            ? {
                $or: [
                    { address: { $regex: search, $options: 'i' } },
                    { area: { $regex: search, $options: 'i' } },
                    { city: { $regex: search, $options: 'i' } },
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { middleName: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        let query;

        if (fromDate || toDate) {
            searchConditions.$or = [
                { signOutDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
                // { signOutDate: { $lte: new Date(toDate) } }
            ]
        }

        if (['agent', 'company'].includes(role)) {
            const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
            const staffIds = staffMembers.map(staff => staff._id);

            query = {
                $and: [
                    { isSignOut: 1 },
                    searchConditions,
                    {
                        $or: [
                            { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'User' },
                            { addedBy: { $in: staffIds }, addedByModel: 'Staff' }
                        ]
                    }
                ]
            };
        } else if (['staff', 'company-agent'].includes(role)) {
            const staffMembers = await Staff.findOne({ _id }).select('permission').lean();
            if (!staffMembers?.permission.includes(3)) {
                return res.status(403).json({ message: 'Access Denied', success: false });
            }
            query = {
                $and: [
                    { isSignOut: 1 },
                    searchConditions,
                    { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'Staff' }
                ]
            };
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const tenants = await Tenants.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'properties',
                    localField: 'property',
                    foreignField: '_id',
                    as: 'propertyDetails'
                }
            },
            { $unwind: { path: "$propertyDetails", preserveNullAndEmptyArrays: true } },
            { $match: searchConditions },
            {
                $project: {
                    addedBy: 1,
                    firstName: 1,
                    lastName: 1,
                    middleName: 1,
                    dateOfBirth: 1,
                    room: 1,
                    signOutDate: 1,
                    signInDate: 1,
                    createdAt: 1,
                    addedByModel: 1,
                    claimReferenceNumber: 1,
                    nationalInsuranceNumber: 1,
                    'propertyDetails._id': 1,
                    'propertyDetails.address': 1,
                    'propertyDetails.area': 1,
                    'propertyDetails.city': 1
                }
            },

            { $sort: { createdAt: -1 } },

            { $skip: (pageNum - 1) * limitNum },

            { $limit: limitNum },
            { $sort: { signOutDate: 1 } }
        ]);

        const modifydata = await Promise.all(
            tenants.map(async (item) => {
                let addedByData;
                if (['Staff'].includes(item.addedByModel)) {
                    addedByData = await Staff.findOne({ _id: item.addedBy }).select('username _id role').populate({ path: 'addedBy', select: 'role' });
                    return {
                        ...item,
                        property: `${item.propertyDetails?.address}, ${item.propertyDetails?.area}, ${item.propertyDetails?.city}`,
                        addedByusername: addedByData?.username,
                        addedbyrole: addedByData?.role,
                        addedByData,
                        claimReferenceNumber: item?.claimReferenceNumber === ('' || undefined) ? "No" : item?.claimReferenceNumber
                    };
                } else if (['User'].includes(item.addedByModel)) {
                    addedByData = await user.findOne({ _id: item.addedBy }).select('username _id role fname lname companyname').populate({ path: 'addedBy', select: 'role' })
                    return {
                        ...item,
                        property: `${item.propertyDetails?.address}, ${item.propertyDetails?.area}, ${item.propertyDetails?.city}`,
                        addedByusername: ['company'].includes(addedByData?.role) ? addedByData?.companyname : addedByData.fname + " " + addedByData.lname,
                        addedbyrole: addedByData?.role,
                        addedByData,
                        claimReferenceNumber: item?.claimReferenceNumber === ('' || undefined) ? "No" : item?.claimReferenceNumber
                    };
                }

            })
        );

        const total = await Tenants.countDocuments(query);

        if (!tenants || tenants.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tenants found matching the criteria.',
                data: [],
                pagination: {
                    total: 0,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: 0
                }
            });
        }
        res.status(200).json({
            success: true,
            message: 'Tenants fetched successfully.',
            data: modifydata,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tenants',
            error: error.message
        });
    }
}

export const signOutTenants = async (req, res, next) => {
    try {
        const { _id, propertyid, room, addedByModel } = req.query;
        const userId = req.headers['user']
        if (!mongoose.isObjectIdOrHexString(_id)) {
            return res.status(400).json({ success: false, message: 'Invalid Tenant ID' });
        }

        const tenantId = new mongoose.Types.ObjectId(_id);
        const propertyObjectId = new mongoose.Types.ObjectId(propertyid);
        let date = new Date()
        const tenant = await Tenants.findByIdAndUpdate(
            tenantId,
            { isSignOut: true, signOutDate: date.toISOString(), signOutper: { byWhom: userId, addedByModel } },
            { new: true }
        );

        if (!tenant) {
            return res.status(404).json({ success: false, message: 'Tenant not found!' });
        }
        const updatedProperty = await Property.findByIdAndUpdate(
            propertyObjectId,
            {
                $pull: { tenants: { tenant_id: tenantId } }
            }, { new: true }
        );
        await Property.findByIdAndUpdate(
            propertyObjectId,
            {
                $push: { tenants: { roomNo: parseInt(tenant?.room), lastsignoutdate: date.toISOString() } }
            }
        );

        if (!updatedProperty) {
            return res.status(404).json({
                success: false,
                message: 'Property not found or tenant not associated with the property!',
            });
        }

        const pdfTemplets = await Template.findOne({ rsl: new mongoose.Types.ObjectId(updatedProperty?.rslTypeGroup), key: 'leaverform' })
        const pdfBuffer = await GeneratePdf(pdfTemplets?._id, tenantId);
        let userData = {}
        if (['Staff'].includes(addedByModel)) {
            let staffdata = await Staff.findById(userId).populate({ path: 'addedBy', select: 'emailcc emailto' }).lean()
            userData = { ...staffdata?.addedBy }
        } else {
            let agentData = await user.findById(userId).select('emailcc emailto').lean()
            userData = { ...agentData }
        }
        const mailObj = {
            replyTo: userData?.emailto,
            to: userData?.emailto,
            bcc: userData?.emailcc,
            subject: `Tenant Sign out from, ${updatedProperty?.address}, ${updatedProperty?.area}, ${updatedProperty?.city}, ${updatedProperty?.postCode}, ${tenant?.firstName || ''} ${tenant?.middleName || ''} ${tenant?.lastName || ''}, ${getDate(tenant?.dateOfBirth)}, ${tenant?.nationalInsuranceNumber}, ${getDate(tenant?.dateOfBirth)}`,
            html: EmailTempelates("signOutTenant", tenant),
            attachments: [{ filename: pdfTemplets?.name, content: pdfBuffer, contentType: 'application/pdf' }],
        };
        await sendMail(mailObj);

        await logUserAction(userId, 'DELETE', {
            councilTaxPayer: updatedProperty.councilTaxPayer,
            address: updatedProperty?.address,
            area: updatedProperty?.area,
            city: updatedProperty?.city,
            postCode: updatedProperty?.postCode,
            room: tenant?.room
        }, 'Tenant', _id, req.query.addedByModel);

        const log = new EmailLog({
            userId: userData?._id,
            subject: mailObj.subject,
            body: mailObj.html,
            attachments: mailObj?.attachments[0].filename,
            emailTo: mailObj?.to,
            emailCC: mailObj?.bcc,
        });
        await log.save();
        return res.status(200).json({
            success: true,
            message: 'Tenant successfully signed out and removed from property.',
            tenant,
            updatedProperty,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to sign out tenant',
            error: error.message,
        });
    }
};






export const EditTenatns = async (req, res) => {
    try {

        const { _id } = req.query;
        const tenant = await Tenants.find({ _id: new mongoose.Types.ObjectId(_id) }, { property: 1, title_before_name: 1, firstName: 1, middleName: 1, lastName: 1, claimReferenceNumber: 1, tenantContactNumber: 1, tenantEmail: 1, dateOfBirth: 1, nationalInsuranceNumber: 1, gender: 1 })
            // .select('title_before_name,firstName, middleName,lastName,claimReferenceNumber,contactNumber,email,dateOfBirth,nationalInsuranceNumber,gender')
            .lean()
        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: 'Tenant details not found',
                data: {}
            });
        } else {
            return res.status(200).json({
                success: true,
                // message: 'Tenant details updated successfully',
                data: tenant[0]
            });
        }

    } catch (error) {
        // console.error('Error signing out tenant:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to sign out tenant',
            error: error.message
        });
    }
}

export const getTenantDetails = async (req, res) => {
    try {
        const { _id } = req.query;

        if (!isValidObjectId(_id)) {
            return res.status(400).json({ success: false, message: 'Invalid Tenant ID' });
        }
        let id = new mongoose.Types.ObjectId(_id)
        // const tenant = await Tenants.findById(_id).populate({path: 'property', select: 'city area address' }).lean();
        const tenant = await Tenants.aggregate([
            { $match: { _id: id } },
            {
                $lookup: {
                    from: 'properties',
                    localField: 'property',
                    foreignField: '_id',
                    as: 'propertyDetails'
                }
            },
            { $unwind: { path: "$propertyDetails", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'rsls',
                    localField: 'propertyDetails.rslTypeGroup',
                    foreignField: '_id',
                    as: 'companyDetails'
                }
            },
            { $unwind: { path: "$companyDetails", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    title_before_name: 1,
                    middleName: 1,
                    lastName: 1,
                    firstName: 1,
                    nationalInsuranceNumber: 1,
                    dateOfBirth: 1,
                    claimReferenceNumber: "$claimReferenceNumber" === ('' || null || undefined) ? "No" : "$claimReferenceNumber",
                    gender: 1,
                    tenantContactNumber: 1,
                    tenantEmail: 1,
                    isSignOut: 1,
                    room: 1,
                    status: 1,
                    signInDate: 1,
                    rslDetails: {
                        _id: '$companyDetails._id',
                        rslname: '$companyDetails.companyname',
                        address: '$companyDetails.address',
                        area: '$companyDetails.area',
                        city: '$companyDetails.city',
                    },
                    propertyDetails: {
                        _id: '$propertyDetails._id',
                        address: '$propertyDetails.address',
                        city: '$propertyDetails.city',
                        area: '$propertyDetails.area',
                        eligibleRent: '$propertyDetails.eligibleRent',
                        postCode: '$propertyDetails.postCode'
                    }
                }
            }
        ]);

        const rslDocuments = await Template.find({ rsl: new mongoose.Types.ObjectId(tenant[0].rslDetails?._id) }).select('_id name')

        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: 'Tenant not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: tenant[0],
            rslDocuments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch tenant details',
            error: error.message,
        });
    }
}

export const checkForNINO = async (req, res) => {
    try {
        const { nino } = req.query;

        if (!nino) {
            return res.status(400).send({
                success: false,
                message: "National Insurance number is required.",
            });
        }

        const users = await Tenants.find({ nationalInsuranceNumber: nino });

        if (users?.length > 0) {
            return res.status(200).send({
                exists: true,
                success: false,
                message: "National Insurance number is already in use.",
            });
        }

        return res.status(200).send({
            exists: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to fetch tenant details.',
            error: error.message,
        });
    }
};
