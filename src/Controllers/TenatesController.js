import mongoose, { isObjectIdOrHexString, isValidObjectId, mongo } from "mongoose";
import Property from "../DB/Schema/PropertySchema.js";
import Tenants from "../DB/Schema/TenantsSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import user from "../DB/Schema/userSchema.js";
import { config } from 'dotenv';
import { convertToISODate, generateAttachments, generateExcelFile, generatePdfFromHtml, getDate, property, replaceData, tenant, UploaadBase64ToS3 } from "../Utils/CommonFunctions.js";
import EmailTempelates from "../Utils/EmailTempelate.js";
import sendMail from "../Utils/email.service.js";
import { getDocumentModule } from "../Models/DocumentModel.js";
import { EmailLog } from "../DB/Schema/EmailLogSchema.js";
import logUserAction from "./ActivityController.js";
import Template from "../DB/Schema/TemplateSchema.js";
import { GeneratePdf } from "../Models/GeneratePdfModel.js";
import RSL from "../DB/Schema/RSLSchema.js";
import { Worker } from 'worker_threads';
import fs from 'fs';
import { __dirname } from '../../index.js'
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../Utils/s3.js";
import bcrypt from 'bcryptjs';
import XLSX from 'xlsx';
import moment from "moment";
import { handleActiveTenants, handleDeleteExportedData, handleNotActiveTenants } from "../Models/TenantModal.js";
// const workerPool = new WorkerPool(3);

export const AddTenants = async (req, res) => {
    try {
        const { _id, property, room, ...data } = req.body;
        // let rentproperty = await Property.findById(property).lean();
        if (!data?.firstName || !data?.lastName) {
            return res.status(400).json({ success: false, message: 'First name and last name are required for the tenant' });
        }
        const [rentproperty, existingTenant] = await Promise.all([
            Property.findById(property).lean(),
            Tenants.findOne({ isSignOut: 0, room, property, }).lean(),
            // Template.find({ rsl: rentproperty?.rslTypeGroup }).lean(),
        ]);

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


            if (!property) {
                return res.status(400).json({ success: false, message: 'Property ID is required' });
            }

            let modifiedData = await UploaadBase64ToS3(data)

            tenant = new Tenants({ ...modifiedData, property, room });
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

            if (data?.tenantSignupEmail && ['User'].includes(req.query.addedByModel) && data?.approved_status == 1) {
                let userData = {}
                let rslData = await RSL.findById(rentproperty?.rslTypeGroup).select('companyname address area city').lean()
                if (['company-agent', 'staff'].includes(data?.addedByRole)) {
                    let staffdata = await Staff.findById(data?.addedBy).populate({ path: 'addedBy', select: 'emailcc emailto' }).lean()
                    userData = { user_id: staffdata?.addedBy?._id, ...staffdata?.addedBy, ...rslData }
                } else {
                    let agentData = await user.findById(data?.addedBy).select('emailcc emailto').lean()
                    userData = { user_id: agentData?._id, ...agentData, ...rslData }
                }
                const pdfTemplates = await Template.find({ rsl: new mongoose.Types.ObjectId(rentproperty?.rslTypeGroup) })
                const attachmentsArray = await Promise.all(
                    pdfTemplates.map(async (pdfTemplet) => {
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
                    to: data?.tenantSignupEmail,
                    bcc: userData?.emailcc,
                    subject: `New Signup, ${rentproperty?.address}, ${rentproperty?.area}, ${rentproperty?.city}, ${rentproperty?.postCode}, ${newTenant?.firstName || ''} 
                ${newTenant?.middleName || ''} ${newTenant?.lastName || ''},
                ${getDate(newTenant?.dateOfBirth)}, ${newTenant?.nationalInsuranceNumber}, ${getDate(newTenant?.dateOfBirth)}, Housing Benefit Form`,
                    html: EmailTempelates("new_tanant",
                        {
                            newTenant,
                            address: rentproperty?.address,
                            area: rentproperty?.area,
                            city: rentproperty?.city,
                            postCode: rentproperty?.postCode
                        }),
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
            }
        }
        if ((['User'].includes(req.query.addedByModel) && data?.approved_status == 1) && property && tenant._id) {
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
        }
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add or update tenant',
            error: error.message || 'Internal server error',
        });
    }
};

export const UpdateAssessment = async (req, res) => {
    try {
        const { _id, assesment, assessmentId } = req.body;

        if (!mongoose.isObjectIdOrHexString(_id)) {
            return res.status(400).json({ success: false, message: 'Invalid Tenant ID' });
        }

        for (let key in assesment) {
            const value = assesment[key];

            if (typeof value === 'string' && value.startsWith('data:image/png;base64,')) {
                try {
                    const base64Data = value.replace(/^data:image\/png;base64,/, '');
                    const fileName = `${Date.now()}-${key}.png`;
                    const buffer = Buffer.from(base64Data, 'base64');
                    const params = {
                        Bucket: process.env.AWS_S3_BUCKET, // Your S3 bucket name
                        Key: `uploads/signatures/${fileName}`, // S3 object key
                        Body: buffer,
                        ContentType: 'image/png', // MIME type of the image
                    }
                    await s3.send(new PutObjectCommand(params));
                    assesment[key] = `uploads/signatures/${fileName}`
                } catch (err) {
                    return res.status(500).json({ error: "Failed to process image" });
                }
            }
        }

        if (assessmentId) {
            await Tenants.updateOne(
                { _id, "assesment._id": assessmentId },
                { $set: { "assesment.$": assesment } }
            );
        } else {

            await Tenants.updateOne(
                { _id },
                { $push: { assesment } }
            );
        }

        return res.status(200).json({ message: 'Assessment Updated Successfully', success: true });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add or update tenant',
            error: error.message || 'Internal server error',
        });
    }
}


export const ListTenents = async (req, res) => {

    try {
        // Extract query parameters
        const { page = 1, limit = 10, search = '', addedBy: _id, fromDate, toDate, role, filter } = req.query;
        const searchConditions = search
            ? {
                $or: [
                    { address: { $regex: search, $options: 'i' } },
                    { area: { $regex: search, $options: 'i' } },
                    { city: { $regex: search, $options: 'i' } },
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { middleName: { $regex: search, $options: 'i' } },
                    { claimReferenceNumber: { $regex: search, $options: 'i' } },
                    { nationalInsuranceNumber: { $regex: search, $options: 'i' } },
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

        if (filter != '') {
            searchConditions.$or = [
                { status: Number(filter) }
            ]
        }
        if (['agent', 'company'].includes(role)) {
            const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
            const staffIds = staffMembers.map(staff => staff._id);

            query = {
                $and: [
                    { isSignOut: 0 },
                    { isDeleted: 0 },
                    { approved_status: 1 },
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
                    { isDeleted: 0 },
                    { approved_status: 1 },
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
                    status: {
                        $cond: { if: { $eq: ["$status", 1] }, then: "active", else: "not-active" }
                    },
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
        console.log(error);
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
                    { middleName: { $regex: search, $options: 'i' } },
                    { claimReferenceNumber: { $regex: search, $options: 'i' } },
                    { nationalInsuranceNumber: { $regex: search, $options: 'i' } },
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
                    { isDeleted: 0 },
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
                    { isDeleted: 0 },
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
            { $sort: { signOutDate: -1 } },
            { $skip: (pageNum - 1) * limitNum },
            { $limit: limitNum },
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
        const { _id, propertyid, room, addedByModel, } = req.query;
        const { withOutMail, signature, isPresent, signOutDate, password } = req.body;
        const userId = req.headers['user']


        if (!password) {
            return res.status(401).json({ message: 'Please enter Password!' });
        }
        let LoggedInUser;
        if (['Staff'].includes(addedByModel)) {
            LoggedInUser = await Staff.findById(new mongoose.Types.ObjectId(userId))
        } else {
            LoggedInUser = await user.findById(new mongoose.Types.ObjectId(userId))
        }
        if (!LoggedInUser) {
            return res.status(400).json({ success: false, message: 'user not found!' });
        }

        const isPasswordMatched = await bcrypt.compare(password, LoggedInUser.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: 'Incorrect Password!' });
        }

        if (!mongoose.isObjectIdOrHexString(_id)) {
            return res.status(400).json({ success: false, message: 'Invalid Tenant ID' });
        }

        for (let key in req.body) {
            const value = req.body[key];

            if (typeof value === 'string' && value.startsWith('data:image/png;base64,')) {
                try {
                    const base64Data = value.replace(/^data:image\/png;base64,/, '');
                    const fileName = `${Date.now()}-${key}.png`;
                    const buffer = Buffer.from(base64Data, 'base64');
                    const params = {
                        Bucket: process.env.AWS_S3_BUCKET, // Your S3 bucket name
                        Key: `uploads/signatures/${fileName}`, // S3 object key
                        Body: buffer,
                        ContentType: 'image/png', // MIME type of the image
                    }
                    await s3.send(new PutObjectCommand(params));
                    req.body[key] = `uploads/signatures/${fileName}`
                } catch (err) {
                    return res.status(500).json({ error: "Failed to process image" });
                }
            }
        }
        const tenantId = new mongoose.Types.ObjectId(_id);
        const propertyObjectId = new mongoose.Types.ObjectId(propertyid);
        let date = new Date()
        const tenant = await Tenants.findByIdAndUpdate(
            tenantId,
            {
                signoutsignature: req?.body?.signature,
                isPresent,
                signOutDate,
                isSignOut: true,
                signOutper: { byWhom: userId, addedByModel },

            },
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

        if (withOutMail === false) {

            // if (['6763a64fb4567a506762d235'].includes(updatedProperty?.rslTypeGroup)) {
            //     pdfTemplets = await Template.findOne({ rsl: new mongoose.Types.ObjectId(updatedProperty?.rslTypeGroup), key: isPresent === true ? 'leaverform' : 'leaverform2' })
            // } else {
            // }

            let pdfTemplets;
            pdfTemplets = await Template.findOne({ rsl: new mongoose.Types.ObjectId(updatedProperty?.rslTypeGroup), key: 'leaverform' })
            const pdfBuffer = await GeneratePdf(pdfTemplets?._id, tenantId, {});
            let userData = {}
            if (['Staff'].includes(addedByModel)) {
                let staffdata = await Staff.findById(userId).populate({ path: 'addedBy', select: 'emailcc emailto' }).lean()
                userData = { ...staffdata?.addedBy }
            } else {
                let agentData = await user.findById(userId).select('emailcc emailto').lean()
                userData = { ...agentData }
            }

            await logUserAction(userId, 'DELETE', {
                councilTaxPayer: updatedProperty.councilTaxPayer,
                address: updatedProperty?.address,
                area: updatedProperty?.area,
                city: updatedProperty?.city,
                postCode: updatedProperty?.postCode,
                room: tenant?.room
            }, 'Tenant', _id, req.query.addedByModel);

            const mailObj = {
                replyTo: userData?.emailto,
                to: userData?.emailto,
                bcc: userData?.emailcc,
                subject: `Tenant Sign out from, ${updatedProperty?.address}, ${updatedProperty?.area}, ${updatedProperty?.city}, ${updatedProperty?.postCode}, ${tenant?.firstName || ''} ${tenant?.middleName || ''} ${tenant?.lastName || ''}, ${getDate(tenant?.dateOfBirth)}, ${tenant?.nationalInsuranceNumber}, ${getDate(tenant?.dateOfBirth)}`,
                html: EmailTempelates("signOutTenant", tenant),
                attachments: [{ filename: pdfTemplets?.name, content: pdfBuffer, contentType: 'application/pdf' }],
            };
            await sendMail(mailObj);
            const log = new EmailLog({
                userId: userData?._id,
                subject: mailObj.subject,
                body: mailObj.html,
                attachments: mailObj?.attachments[0].filename,
                emailTo: mailObj?.to,
                emailCC: mailObj?.bcc,
            });
            await log.save();
        }


        return res.status(200).json({
            success: true,
            message: 'Tenant successfully signed out and removed from property.',
            // tenant,
            // updatedProperty,
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
        // const tenant = await Tenants.aggregate([
        //     { $match: { _id: id } },
        //     { $unwind: { path: "$assesment", preserveNullAndEmptyArrays: true } },
        //     // { $addFields: { assessment: { $ifNull: ["$assessment", []] } } },

        //     {
        //         $lookup: {
        //             from: 'properties',
        //             localField: 'property',
        //             foreignField: '_id',
        //             as: 'propertyDetails'
        //         }
        //     },
        //     { $unwind: { path: "$propertyDetails", preserveNullAndEmptyArrays: true } },
        //     {
        //         $lookup: {
        //             from: 'rsls',
        //             localField: 'propertyDetails.rslTypeGroup',
        //             foreignField: '_id',
        //             as: 'companyDetails'
        //         }
        //     },
        //     { $unwind: { path: "$companyDetails", preserveNullAndEmptyArrays: true } },
        //     {
        //         $addFields: {
        //             assessment: { $ifNull: ["$assesment", []] }
        //         }
        //     },
        //     {
        //         $project: {

        //             assessment: {
        //                 $map: {
        //                     input: "$assessment",
        //                     as: "item",
        //                     in: {
        //                         _id: "$$item._id",
        //                         nextAssessmentDate: "$$item.nextAssessmentDate",
        //                         currentAssessmentDate: "$$item.currentAssessmentDate",
        //                         dateOfAssessment: "$$item.dateOfAssessment"
        //                     }
        //                 }
        //             },
        //             title_before_name: 1,
        //             middleName: 1,
        //             lastName: 1,
        //             firstName: 1,
        //             nationalInsuranceNumber: 1,
        //             dateOfBirth: 1,
        //             claimReferenceNumber: "$claimReferenceNumber" === ('' || null || undefined) ? "No" : "$claimReferenceNumber",
        //             gender: 1,
        //             tenantContactNumber: 1,
        //             tenantEmail: 1,
        //             isSignOut: 1,
        //             room: 1,
        //             status: 1,
        //             signInDate: 1,
        //             rslDetails: {
        //                 _id: '$companyDetails._id',
        //                 rslname: '$companyDetails.companyname',
        //                 address: '$companyDetails.address',
        //                 area: '$companyDetails.area',
        //                 city: '$companyDetails.city',
        //             },
        //             propertyDetails: {
        //                 _id: '$propertyDetails._id',
        //                 address: '$propertyDetails.address',
        //                 city: '$propertyDetails.city',
        //                 area: '$propertyDetails.area',
        //                 eligibleRent: '$propertyDetails.eligibleRent',
        //                 postCode: '$propertyDetails.postCode'
        //             },

        //         }
        //     }
        // ]);
        const tenant = await Tenants.aggregate([
            { $match: { _id: id } },
            // { $unwind: { path: "$assesment", preserveNullAndEmptyArrays: true } },

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
            {
                $lookup: {
                    from: 'templates',
                    localField: 'propertyDetails.rslTypeGroup',
                    foreignField: 'rsl',
                    as: 'rslTemplates'
                }
            },
            { $unwind: { path: "$companyDetails", preserveNullAndEmptyArrays: true } },
            // { $unwind: { path: "$rslTemplates", preserveNullAndEmptyArrays: true } },

            {
                $addFields: {
                    assesment: { $ifNull: ["$assesment", []] }
                }
            },
            {
                $project: {
                    rslTemplates: {
                        $map: {
                            input: "$rslTemplates",
                            as: "item",
                            in: {
                                _id: "$$item._id",
                                name: "$$item.name",
                                key: '$$item.key'
                            }
                        }
                    },
                    // assesment: {
                    //     $map: {
                    //         input: "$assesment",
                    //         as: "item",
                    //         in: {
                    //             _id: "$$item._id",
                    //             nextAssessmentDate: "$$item.nextAssessmentDate",
                    //             currentAssessmentDate: "$$item.currentAssessmentDate",
                    //             dateOfAssessment: "$$item.dateOfAssessment",
                    //             temp: [{
                    //                 _id: "$$item._id",
                    //                 name: 'Risk Assessment',
                    //                 key: 'RiskAssessment'
                    //             },
                    //             {
                    //                 _id: "$$item._id",
                    //                 name: 'Your Risk Assessment',
                    //                 key: 'YourRiskAssessment'
                    //             },
                    //             {
                    //                 _id: "$$item._id",
                    //                 name: 'Initial Needs Assessment ',
                    //                 key: 'initialriskassessment'
                    //             }
                    //             ]
                    //         }
                    //     }
                    // },
                    error: 1,
                    title_before_name: 1,
                    middleName: 1,
                    lastName: 1,
                    firstName: 1,
                    nationalInsuranceNumber: 1,
                    dateOfBirth: 1,
                    claimReferenceNumber: {
                        $cond: {
                            if: { $or: [{ $eq: ["$claimReferenceNumber", ""] }, { $eq: ["$claimReferenceNumber", null] }] },
                            then: "No",
                            else: "$claimReferenceNumber"
                        }
                    },
                    gender: 1,
                    tenantContactNumber: 1,
                    tenantEmail: 1,
                    isSignOut: 1,
                    room: 1,
                    status: 1,
                    signInDate: 1,
                    Housing_benefit_weekly_amount: 1,
                    Next_HB_payment_amount: 1,
                    Next_HB_payment_date: 1,
                    Suspended_Date: 1,
                    sts_Str: 1,
                    rslDetails: {
                        _id: '$companyDetails._id',
                        rslname: '$companyDetails.companyname',
                        address: '$companyDetails.address',
                        area: '$companyDetails.area',
                        city: '$companyDetails.city'
                    },
                    propertyDetails: {
                        _id: '$propertyDetails._id',
                        address: '$propertyDetails.address',
                        city: '$propertyDetails.city',
                        area: '$propertyDetails.area',
                        eligibleRent: '$propertyDetails.eligibleRent',
                        postCode: '$propertyDetails.postCode'
                    },
                }
            }
        ]);

        const rslDocuments = await Template.find({
            rsl: new mongoose.Types.ObjectId(tenant[0].rslDetails?._id),
            key: { $ne: 'leaverform' }
        }).select('_id name');

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


export const getAssessment = async (req, res) => {
    try {
        const { _id } = req.query;
        const tenant = await Tenants.findById(_id).select('assesment').lean();
        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: 'Tenant not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: tenant,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch tenant details',
            error: error.message,
        });
    }
}

export const PendingTenentsList = async (req, res) => {

    try {
        // Extract query parameters
        const { page = 1, limit = 10, search = '', addedBy: _id, fromDate, toDate, role, filter } = req.query;
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
                    { approved_status: 0 },
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
                    { approved_status: 0 },
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

export const approveStatus = async (req, res) => {
    try {
        const { approved_status, _id, propertyid, addedByModel } = req.query;
        if (!mongoose.isObjectIdOrHexString(_id)) {
            return res.status(400).json({ success: false, message: 'Invalid Tenant ID' });
        }
        let date = new Date()
        const userId = req.headers['user']
        let tenant_id = new mongoose.Types.ObjectId(_id)
        let propertyObjectId = new mongoose.Types.ObjectId(propertyid);
        const tenant = await Tenants.findByIdAndUpdate(
            tenant_id,
            {
                approved_status,
                isSignOut: approved_status == 1 ? false : true,
                signOutper: { byWhom: userId, addedByModel },
            },
            { new: true }
        );
        if (!tenant) {
            return res.status(404).json({ success: false, message: 'Tenant not found!' });
        }
        //add property data here

        if (approved_status == 1) {
            if (propertyObjectId && tenant._id) {
                await Property.updateOne(
                    { _id: propertyObjectId },
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
                                                    in: { $eq: ["$$tenant.roomNo", tenant?.room] },
                                                },
                                            },
                                        },
                                        then: {
                                            $map: {
                                                input: "$tenants",
                                                as: "tenant",
                                                in: {
                                                    $cond: [
                                                        { $eq: ["$$tenant.roomNo", tenant?.room] },
                                                        {
                                                            $mergeObjects: [
                                                                "$$tenant",
                                                                {
                                                                    tenant_id: tenant._id,
                                                                    signInDate: tenant.signInDate,
                                                                    endDate: tenant.endDate,
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
                                                        roomNo: parseInt(tenant?.room),
                                                        signInDate: tenant.signInDate,
                                                        endDate: tenant.endDate,
                                                    },
                                                ],
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    ],
                    { new: true }
                );
            }
            let userData = {}
            let rentproperty = await Property.findById(propertyObjectId).lean()
            let rslData = await RSL.findById(rentproperty?.rslTypeGroup).select('companyname address area city').lean()
            if (['company-agent', 'staff'].includes(tenant?.addedByRole)) {
                let staffdata = await Staff.findById(tenant?.addedBy).populate({ path: 'addedBy', select: 'emailcc emailto' }).lean()
                userData = { user_id: staffdata?.addedBy?._id, ...staffdata?.addedBy, ...rslData }
            } else {
                let agentData = await user.findById(tenant?.addedBy).select('emailcc emailto').lean()
                userData = { user_id: agentData?._id, ...agentData, ...rslData }
            }
            const pdfTemplates = await Template.find({ rsl: new mongoose.Types.ObjectId(rentproperty?.rslTypeGroup) })
            const attachmentsArray = await Promise.all(
                pdfTemplates.map(async (pdfTemplet) => {
                    const pdfBuffer = await GeneratePdf(pdfTemplet?._id, tenant?._id);
                    return {
                        filename: pdfTemplet?.name,
                        content: pdfBuffer,
                        contentType: 'application/pdf',
                    };
                })
            );
            const mailObj = {
                replyTo: userData?.emailto,
                // to: userData?.emailto,
                to: tenant?.tenantSignupEmail,
                bcc: userData?.emailcc,
                subject: `New Signup, ${rentproperty?.address}, ${rentproperty?.area}, ${rentproperty?.city}, ${rentproperty?.postCode}, ${tenant?.firstName || ''} 
                ${tenant?.middleName || ''} ${tenant?.lastName || ''},
                ${getDate(tenant?.dateOfBirth)}, ${tenant?.nationalInsuranceNumber}, ${getDate(tenant?.dateOfBirth)}, Housing Benefit Form`,
                html: EmailTempelates("new_tanant",
                    {
                        tenant,
                        address: rentproperty?.address,
                        area: rentproperty?.area,
                        city: rentproperty?.city,
                        postCode: rentproperty?.postCode
                    }),
                attachments: [...attachmentsArray],
            };
            await sendMail(mailObj);
            const log = new EmailLog({
                userId: ['company-agent', 'staff'].includes(tenant?.addedByRole) ? userData?.user_id : userData?.user_id,
                subject: mailObj?.subject,
                body: mailObj?.html,
                attachments: mailObj?.attachments.map(attachment => attachment.filename).join(', '),
                emailTo: mailObj?.to,
                emailCC: mailObj?.bcc,
            });
            await log.save();
        }
        // else {
        //     const updatedProperty = await Property.findByIdAndUpdate(
        //         propertyObjectId,
        //         {
        //             $pull: { tenants: { tenant_id: tenant_id } }
        //         }, { new: true }
        //     );
        //     await Property.findByIdAndUpdate(
        //         propertyObjectId,
        //         {
        //             $push: { tenants: { roomNo: parseInt(tenant?.room), lastsignoutdate: date.toISOString() } }
        //         }
        //     );
        //     if (!updatedProperty) {
        //         return res.status(404).json({
        //             success: false,
        //             message: 'Property not found or tenant not associated with the property!',
        //         });
        //     }
        // }
        return res.send({
            success: false,
            message: 'Tenant Updated Successfully...',
        })


    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Failed to fetch tenants',
            error: error.message
        });
    }
}

export const getTenantsAllDetails = async (req, res) => {
    try {
        const { _id } = req.query;

        if (!isObjectIdOrHexString(_id)) {
            return res.status(401).json({
                success: false,
                message: 'Failed to fetch tenants',
                error: error.message
            });
        }

        const tenantid = new mongoose.Types.ObjectId(_id)
        const tenant = await Tenants.findById(tenantid).lean()
        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: 'Failed to fetch tenant details',
                // error: error.message
            });
        }

        return res.send({
            tenant,
            success: true,
            // message: '',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tenants',
            error: error.message
        });
    }
}


const handleExportLogic = async (obj) => {
    try {
        const isDateFormat = (str) => /^\d{2}-\d{2}-\d{4}$/.test(str);
        let modifiedObj = {};


        Object.entries(replaceData).forEach(([key, val]) => {

            if (['Sign In Date', "Date of Birth"].includes(val)) {
                if (obj[val]) {
                    modifiedObj[key] = convertToISODate(obj[val]);
                }
            } else {
                modifiedObj[key] = obj[val] || '';
            }
        });
        const address = `${modifiedObj?.doornumber},${modifiedObj?.rodename}`
        modifiedObj["address"] = address
        modifiedObj['fullAddress'] = `${address},${modifiedObj?.area},${modifiedObj?.city},${modifiedObj?.postCode}`
        const rslDoc = await RSL.findOne({ companyname: modifiedObj?.rslTypeGroup }).lean();
        modifiedObj['rslTypeGroup'] = rslDoc?._id || null;
        return modifiedObj;
    } catch (error) {
        throw new Error(`Error in handleExportLogic: ${error.message}`);
    }
};

const sapratePropertyandTenantData = async (arr) => {


    try {

        let tenantData = []
        let propertydata = []
        if (arr.length == 0) return { tenantData, propertydata }
        let rslIds = [];
        arr.forEach((arItm) => {
            if (
                arItm?.rslTypeGroup !== null &&
                !rslIds.some((id) => id.toString() === arItm.rslTypeGroup.toString())
            ) {
                rslIds.push(arItm.rslTypeGroup);
            }
        });
        let properties = []
        await Promise.all(
            Array.from(rslIds).map(async (_id) => {
                let property = await Property.find({ rslTypeGroup: _id, status: 0 })
                    .select('rslTypeGroup fullAddress')
                    .lean();
                properties = [...properties, ...property];
            })
        );
        // console.log(properties);

        for (const arrItem of arr) {
            let proObj = {}
            let tenObj = {}
            if (arrItem?.rslTypeGroup !== null) properties = await Property.find({ rslTypeGroup: arrItem?.rslTypeGroup })
            Object.keys(arrItem).forEach((key) => {
                if (property.includes(key) && arrItem?.rslTypeGroup !== null) {
                    if (!propertydata.some((itm) => itm?.fullAddress == arrItem?.fullAddress)) {
                        proObj[key] = arrItem[key]
                    }
                }
                if (tenant.includes(key)) {
                    tenObj[key] = arrItem[key]
                }
            })
            let isPropertyExist
            if (proObj?.rslTypeGroup !== null) {
                isPropertyExist = properties.find((pro) => (pro.fullAddress == arrItem?.fullAddress))
                if (!isPropertyExist?._id && Object.entries(proObj).length > 0) {
                    let newProperty = await Property.create({ ...proObj, status: 0 })
                    tenObj['property'] = newProperty?._id || null
                    proObj['_id'] = newProperty?._id || null
                } else {
                    await Property.findByIdAndUpdate(isPropertyExist?._id, { isDeleted: 0, status: 0 })
                    tenObj['property'] = isPropertyExist?._id || null
                    proObj['_id'] = isPropertyExist?._id || null
                }
            }
            propertydata.push(proObj)
            tenantData.push(tenObj)
        }

        return { tenantData, propertydata }

    } catch (error) {
        console.log('error in sapratePropertyandTenantData func', error);
    }
}

export const importExistingTenant = async (req, res) => {
    try {
        const { addedByModel, addedByRole, addedBy } = req.body;
        if (!req.files) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        const fileBuffer = fs.readFileSync(req?.files?.file[0]?.path);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });
        let modifiedData = data.map(async (obj) => {
            let modifiedObj = await handleExportLogic(obj)
            // console.log('modifiedObj',modifiedObj);
            return { ...modifiedObj, addedByModel, addedByRole, addedBy }
        })
        // console.log('obj', modifiedData);

        let finalData = await Promise.all(modifiedData)
        let { tenantData, propertydata } = await sapratePropertyandTenantData(finalData)
        for (const tenObj of tenantData) {
            if (tenObj?.property) {
                // console.log(tenObj.signInDate);

                let tenant = new Tenants({ ...tenObj, isDeleted: 0, approved_status: 1, isSignOut: 0, status: 0, signOutDate: null, endDate: null })
                let newtenant = await tenant.save()
                // console.log(newtenant?._id);
                if (['User'].includes(addedByModel) && tenObj?.property && newtenant?._id) {
                    await Property.updateOne(
                        { _id: newtenant?.property },
                        [
                            {
                                $set: {
                                    isDeleted: 0,
                                    tenants: {
                                        $cond: {
                                            if: {
                                                $anyElementTrue: {
                                                    $map: {
                                                        input: "$tenants",
                                                        as: "tenant",
                                                        in: { $eq: ["$$tenant.roomNo", newtenant?.room] },
                                                    },
                                                },
                                            },
                                            then: {
                                                $map: {
                                                    input: "$tenants",
                                                    as: "tenant",
                                                    in: {
                                                        $cond: [
                                                            { $eq: ["$$tenant.roomNo", newtenant?.room] },
                                                            {
                                                                $mergeObjects: [
                                                                    "$$tenant",
                                                                    {
                                                                        tenant_id: newtenant?._id,
                                                                        signInDate: newtenant?.signInDate,
                                                                        // endDate: data.endDate,
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
                                                            tenant_id: newtenant?._id,
                                                            roomNo: parseInt(newtenant?.room),
                                                            signInDate: newtenant?.signInDate,
                                                            // endDate: data.endDate,
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
                }
            }
        }
        // fs.writeFileSync("demo.json", JSON.stringify({ tenantData, propertydata }))
        return res.send({ success: true, message: 'File Uploaded' })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tenants',
            error: error.message
        });
    }
}

export const ExportNotActiveTenants = async (req, res) => {
    try {
        const { _id, role } = req.body;
        const { addedByModel } = req.query;

        let query = {};
        if (['User', 'company'].includes(addedByModel)) {
            const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
            const staffIds = staffMembers.map(staff => staff._id);

            query = {
                $and: [
                    { status: 0 },
                    { isSignOut: 0 },
                    {
                        $or: [
                            { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'User' },
                            { addedBy: { $in: staffIds }, addedByModel: 'Staff' }
                        ]
                    }
                ]
            };
        } else if (['Staff', 'company-agent'].includes(addedByModal)) {

            const staffMembers = await Staff.findOne({ _id }).select('permission').lean();
            if (!staffMembers?.permission.includes(5)) {
                return res.status(403).json({ message: 'Access Denied', success: false });
            }
            query = {
                $and: [
                    { isSignOut: 0 },
                    { status: 0 },
                    { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'Staff' }
                ]
            };
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }

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
            {
                $lookup: {
                    from: 'rsls',
                    localField: 'propertyDetails.rslTypeGroup',
                    foreignField: '_id',
                    as: 'companyDetails'
                }
            },
            { $unwind: { path: "$propertyDetails", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    status: {
                        $cond: { if: { $eq: ["$status", 1] }, then: "active", else: "not-active" }
                    },
                    status: 1,
                    "addedBy": '$addedBy',
                    "firstName": "$firstName",
                    "lastName": "$lastName",
                    "middleName": "$middleName",
                    "dateOfBirth": "$dateOfBirth",
                    addedByModel: 1,
                    "room": "$room",
                    "signInDate": "$signInDate",
                    "createdAt": "$createdAt",
                    "claimReferenceNumber": "$claimReferenceNumber",
                    'nationalInsuranceNumber': "$nationalInsuranceNumber",
                    "propertyAddress": '$propertyDetails.address',
                    "area": '$propertyDetails.area',
                    "city": '$propertyDetails.city',
                    "bedrooms": '$propertyDetails.bedrooms',
                    "basicRent": '$propertyDetails.basicRent',
                    postCode: '$propertyDetails.postCode',
                    serviceCharges: '$propertyDetails.serviceCharges',
                    eligibleRent: '$propertyDetails.eligibleRent',
                    ineligibleCharge: '$propertyDetails.ineligibleCharge',
                    sharedWithOther: '$propertyDetails.sharedWithOther',
                    'rslTypeGroup': { $arrayElemAt: ['$companyDetails.companyname', 0] },
                }
            },
        ]);
        const modifydata = await Promise.all(
            tenants.map(async (item) => {
                let addedByData;
                if (['Staff'].includes(item.addedByModel)) {
                    addedByData = await Staff.findOne({ _id: item.addedBy }).select('username _id role').populate({ path: 'addedBy', select: 'role' });
                    return {
                        ...item,
                        property: `${item.propertyDetails?.address}, ${item.propertyDetails?.area}, ${item.propertyDetails?.city}`,
                        addedBy: addedByData?.username,
                        claimReferenceNumber: item?.claimReferenceNumber === ('' || undefined) ? "No" : item?.claimReferenceNumber
                    };
                } else if (['User'].includes(item.addedByModel)) {
                    addedByData = await user.findOne({ _id: item.addedBy }).select('username _id role fname lname companyname').populate({ path: 'addedBy', select: 'role' })
                    return {
                        ...item,
                        property: `${item.propertyDetails?.address}, ${item.propertyDetails?.area}, ${item.propertyDetails?.city}`,
                        addedBy: ['company'].includes(addedByData?.role) ? addedByData?.companyname : addedByData.fname + " " + addedByData.lname,
                        addedbyrole: addedByData?.role,
                        addedByData,
                        claimReferenceNumber: item?.claimReferenceNumber === ('' || undefined) ? "No" : item?.claimReferenceNumber
                    };
                }

            })
        );
        let replaceKeys = {
            createdAt: 'Created At',
            addedBy: 'Added By',
            rslTypeGroup: "Rsl",
            propertyAddress: 'Property Address',
            area: "Area Name",
            city: "City",
            postCode: "Postcode",
            bedrooms: "Number of Bedrooms in Property",
            basicRent: "Basic Rent",
            serviceCharges: "Service Charges",
            eligibleRent: "eligible Rent",
            ineligibleCharge: "weekly eligible Charge",
            sharedWithOther: "Bedroom sharedWithOther",
            firstName: "First Name",
            middleName: "Middle Name",
            lastName: "Surname",
            room: "Room",
            dateOfBirth: "Date of Birth",
            nationalInsuranceNumber: "NINO",
            claimReferenceNumber: "Claim Reference No",
            signInDate: "Sign In Date"
        }


        let buffer = await generateExcelFile(modifydata, replaceKeys)

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=download.xlsx");
        res.setHeader('Content-Length', buffer.length);
        return res.end(buffer);


        // Send the buffer as a response
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Failed to fetch tenants',
            error: error.message
        });
    }
}


export const HandleSendEmailToAgent = async (req, res) => {
    try {
        let { _id, status, email } = req.query;
        if (!isObjectIdOrHexString(_id) || !_id) {
            return res.send({ message: 'invalid Agent data.', success: false })
        }

        let tenants;
        if (status == 1) {
            tenants = await handleActiveTenants(_id)
        } else {
            tenants = await handleNotActiveTenants(_id)
        }


        if (tenants.length == 0) {
            return res.send({ message: 'No tenants available', success: false, severity: 'error' })
        }

        let replaceKeys = {
            createdAt: 'Created At',
            addedBy: 'Added By',
            rslTypeGroup: "Rsl",
            propertyAddress: 'Property Address',
            area: "Area Name",
            city: "City",
            postCode: "Postcode",
            bedrooms: "Number of Bedrooms in Property",
            basicRent: "Basic Rent",
            serviceCharges: "Service Charges",
            eligibleRent: "eligible Rent",
            ineligibleCharge: "weekly eligible Charge",
            sharedWithOther: "Bedroom sharedWithOther",
            firstName: "First Name",
            middleName: "Middle Name",
            lastName: "Surname",
            room: "Room",
            dateOfBirth: "Date of Birth",
            nationalInsuranceNumber: "NINO",
            claimReferenceNumber: "Claim Reference No",
            signInDate: "Sign In Date"
        }

        let buffer = await generateExcelFile(tenants, replaceKeys)

        let attachment = {
            filename: status == 1 ? 'Active Tenants List' : 'Not-Active Tenants List',
            content: buffer,
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: status == 1 ? 'Active Tenants List' : 'Not-Active Tenants List',
            attachments: [{ ...attachment }],
        };

        let info = await sendMail(mailOptions);
        const log = new EmailLog({
            userId: _id,
            subject: mailOptions?.subject,
            body: 'Email Sent',
            attachments: mailOptions?.attachments.map(attachment => attachment.filename).join(', '),
            emailTo: mailOptions?.to,
            emailCC: '',
        });
        await log.save();
        if (info?.success == false) {
            return res.send({ message: `somethig went wrong while sending to ${email}`, success: false })
        }
        return res.send({ message: `Email Sended to ${email}`, success: true })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tenants',
            error: error.message
        });
    }
}


export const HandleDeleteExportedData = async (req, res) => {
    try {
        let { _ids, userId } = req.body
        // console.log(req.body);
        let result = await handleDeleteExportedData(_ids, userId)
        return res.send({ message: 'Data deleted Successfully', success: true })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch tenants',
            error: error.message
        });
    }
}