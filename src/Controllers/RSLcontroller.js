import RSL from "../DB/Schema/RSLSchema.js";
import user from "../DB/Schema/userSchema.js"
import { getallRsl } from "../Models/rslmodal.js";
import { HandleError } from "../Utils/CommonFunctions.js"
import bcrypt from 'bcryptjs';
import logUserAction from "./ActivityController.js";
import mongoose from "mongoose";
import { propertyFormFields, rslData, tenantields, tenatsignImageArray } from "../../test.js";
import Template from "../DB/Schema/TemplateSchema.js";
import { getPreSignedUrl } from "../Utils/s3Config.js";
export const RegisterNewRSL = async (req, res) => {

    const image = req.uploadedFiles[0]?.s3Key

    try {
        const {

            addedBy,
            _id,
            fname,
            lname,
            email,
            phonenumber,
            address,
            area,
            city,
            companyname,
            pincode,
            website,
            role = 'company'
        } = req.body

        if (_id) {
            const updateRSL = await RSL.findByIdAndUpdate(_id, {
                rslLogo: image,
                fname,
                lname,
                email,
                phonenumber,
                address,
                area,
                city,
                companyname,
                pincode,
                website,
                role
            }, { new: true, upsert: true });

            if (!updateRSL) {
                return res.status(404).json({ success: false, message: 'Tenant not found to update' });
            } else {
                await logUserAction(addedBy, 'EDIT', {

                    fname,
                    lname,
                    email,
                    phonenumber,
                    address,
                    area,
                    city,
                    companyname,
                    pincode,
                    website,
                }, 'RSL', _id, req.query.addedByModel);
                return res.status(200).json({ success: true, message: 'RSL updated' });
            }


        } else {
            if (!fname || !lname || !email || !phonenumber || !address || !city) {
                return res.status(400).json({ error: 'All required fields must be provided', severity: 'error', success: false });
            }
            const existingUser = await RSL.findOne({ $or: [{ email }, { phonenumber }] });
            if (existingUser) {
                return res.status(400).json({ error: 'RSL already exists with this email or phonenumber', severity: 'error', success: false, page: 1 });
            }
            const newRsl = new RSL({
                fname,
                lname,
                email,
                phonenumber,
                address,
                area,
                city,
                companyname,
                pincode,
                website,
                role,
                addedBy,
                rslLogo: image
            })
            await newRsl.save()
            await logUserAction(addedBy, 'ADD', {
                fname,
                lname,
                email,
                phonenumber,
                address,
                area,
                city,
                companyname,
                pincode,
                website,
            }, 'RSL', newRsl?._id, req.query.addedByModel);
            return res.status(200).json({ message: 'RSL Registred Successfully...', severity: 'success', success: true });
        }

    } catch (error) {
        return HandleError(req, res, error)
    }
}



export const getallRSL = async (req, res) => {
    try {
        const { _id, page, limit, search, filter } = req.query;
        const isMainUser = user.find({ _id, ismainAgent: 1 })
        if (!isMainUser) {
            return HandleError(req, res, {}, 408, 'Access Denied!')
        }

        const data = await getallRsl(_id, page, limit, search, filter)
        return res.send(data)

    } catch (error) {
        return HandleError(req, res, error)
    }
}

export const getRSL = async (req, res) => {
    try {
        const { _id, isMainMa, role, addedBy } = req.query;

        let result;

        if (['agent'].includes(role)) {
            if (isMainMa === "0") {
                result = await RSL.aggregate([
                    {
                        $match: {
                            visibleTo: {
                                $exists: true,
                                $in: [new mongoose.Types.ObjectId(_id)]
                            },
                            status: 0
                        }
                    },
                    { $addFields: { lable: "$companyname" } },
                    {
                        $project: {
                            visibleTo: 1,
                            phonenumber: 1,
                            email: 1,
                            lable: 1,
                            address: 1,
                            area: 1,
                            pincode: 1,
                            city: 1
                        }
                    }
                ]);
            } else {
                result = await RSL.aggregate([
                    { $match: { addedBy: new mongoose.Types.ObjectId(_id), status: 0 } },
                    { $addFields: { lable: "$companyname" } },
                    {
                        $project: {
                            visibleTo: 1,
                            phonenumber: 1,
                            email: 1,
                            lable: 1,
                            address: 1,
                            area: 1,
                            pincode: 1,
                            city: 1
                        }
                    }
                ]);
            }
        } else {
            result = await RSL.aggregate([
                {
                    $match: {
                        visibleTo: {
                            $exists: true,
                            $in: [new mongoose.Types.ObjectId(addedBy)]
                        },
                        status: 0
                    }
                },
                { $addFields: { lable: "$companyname" } },
                {
                    $project: {
                        visibleTo: 1,
                        phonenumber: 1,
                        email: 1,
                        lable: 1,
                        address: 1,
                        area: 1,
                        pincode: 1,
                        city: 1
                    }
                }
            ]);
        }



        return res.send(result);
    } catch (error) {
        return HandleError(req, res, error);
    }
};



export const getrsldetails = async (req, res) => {
    try {

        const { _id } = req.query;
        const rsldetails = await RSL.findById(_id).lean();

        if (!rsldetails) {
            return res.send({ data: {}, success: false, message: 'RSL details not found!' })
        }
        let modifydata = { ...rsldetails }
        if (rsldetails?.rslLogo !== '') {
            modifydata['image'] = await getPreSignedUrl(rsldetails.rslLogo)
        }
        return res.send({ data: modifydata, success: true })
    } catch (error) {
        return HandleError(req, res, error)
    }
}


export const getAllSuggetion = async (req, res) => {
    try {
        // const {} = req.query;

        const TenantArray = [...tenantields, ...tenatsignImageArray];
        const propertyArray = propertyFormFields;
        const RslArray = rslData;

        res.send({ TenantArray, propertyArray, RslArray })

    } catch (error) {
        return HandleError(req, res, error)
    }
}



export const AddNewTemplate = async (req, res) => {
    try {
        const { subject, body, addedBy, rsl, _id, name } = req.body;


        if (!subject || !body || !addedBy || !rsl || !name) {
            return res.status(400).json({ error: 'All required fields must be provided', severity: 'error', success: false });
        }

        if (_id) {
            const updateTemp = await Template.findByIdAndUpdate(_id, {
                subject, body, addedBy, rsl, name
            }, { upsert: true });
            if (!updateTemp) {
                return res.status(200).json({ message: 'Template not found!', severity: 'error', success: false });
            } else {

                return res.status(200).json({ message: 'Your Template has been updated Successfully', severity: 'success', success: true });
            }
        } else {
            const newTemplate = new Template({ subject, body, addedBy, rsl, name })
            await newTemplate.save()
            return res.status(200).json({ message: `Your new Template ${name} has been saved Successfully`, severity: 'success', success: true });
        }

    } catch (error) {
        return HandleError(req, res, error)
    }
}

export const getAllRslTemplates = async (req, res) => {
    try {
        const { rsl_Id, maId, page = 1, limit = 10, search = '' } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const query = {
            rsl: new mongoose.Types.ObjectId(rsl_Id),
            addedBy: new mongoose.Types.ObjectId(maId),
        };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } }, // Search by name
                { description: { $regex: search, $options: 'i' } }, // Search by description
            ];
        }

        const totalTemplates = await Template.countDocuments(query);

        const templates = await Template.find(query)
            .select('name createdAt')
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);


        // Send response with pagination details
        return res.status(200).json({
            success: true,
            data: templates,
            pagination: {
                total: totalTemplates,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(totalTemplates / limitNumber),
            },
        });
    } catch (error) {
        return HandleError(req, res, error);
    }
};


export const getTemplateDetails = async (req, res) => {
    try {
        const { rslId, templateId } = req.query;

        if (!rslId || !templateId) {
            return res.status(400).json({
                success: false,
                message: "rslId and templateId are required.",
            });
        }

        const template = await Template.findOne({
            rsl: new mongoose.Types.ObjectId(rslId),
            _id: new mongoose.Types.ObjectId(templateId),
        });

        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: template,
        });
    } catch (error) {
        return HandleError(req, res, error);
    }
};

export const setrslforagent = async (req, res) => {
    try {
        const { userId, Property_per } = req.body;
        const currentProperties = await RSL.find(
            { visibleTo: userId },
            { _id: 1 } // Fetch only the IDs
        ).lean();

        const currentPropertyIds = currentProperties.map((p) => p._id.toString());

        // Step 2: Determine properties to remove and add
        const toRemove = currentPropertyIds.filter(
            (id) => !Property_per.includes(id)
        );
        const toAdd = Property_per.filter(
            (id) => !currentPropertyIds.includes(id)
        );

        // Step 3: Update the database
        if (toRemove.length > 0) {
            await RSL.updateMany(
                { _id: { $in: toRemove } },
                { $pull: { visibleTo: userId } }
            );
        }

        if (toAdd.length > 0) {
            await RSL.updateMany(
                { _id: { $in: toAdd } },
                { $addToSet: { visibleTo: userId } }
            );
        }
        return res.status(200).json({
            message: "Properties updated successfully",
        });

    } catch (error) {
        return HandleError(req, res, error);
    }
}