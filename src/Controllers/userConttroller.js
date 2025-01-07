import mongoose from "mongoose";
import { EmailLog } from "../DB/Schema/EmailLogSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import user from "../DB/Schema/userSchema.js";
import { __dirname } from "../../index.js";
import { HandleError } from "../Utils/CommonFunctions.js";
import RSL from "../DB/Schema/RSLSchema.js";
import { getDynemicPdf } from "../Models/GetDynemicDocuments.js";
import puppeteer from "puppeteer";
import { GeneratePdf } from "../Models/GeneratePdfModel.js";


export const AddCompanies = async (req, res) => {
    try {
        const { ids, _id } = req.body;

        // Update the selectedData field with new ids for the user with the specified _id
        const updatedUser = await user.findByIdAndUpdate(
            _id,
            { selectedData: ids }, // This will replace the old data with the new ids
            { new: true } // This option returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.json({ ids: updatedUser.selectedData, success: true });
    } catch (error) {

        res.status(500).json({ message: 'Failed to update selectedData', success: false });
    }
};

export const getSelectedData = async (req, res) => {
    const { _id, role, addedBy } = req.query
    try {
        let data

        if (['agent'].includes(role)) {
            data = await user.find({ _id: _id, role: 'agent' }, 'selectedData');
        } else if (['staff'].includes(role)) {
            data = await user.find({ _id: addedBy, role: 'agent', isMainMA: 0 }, 'selectedData');
        }
        // console.log(data);

        // Find users where role is 'agent' and select only the `selectedData` field
        if (data.length === 0) {
            return res.status(404).json({ message: 'No Companies found', success: false });
        }
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


export const checkUserHasStaffOrAgent = async (req, res) => {
    try {
        const userId = req.headers['user']
        const foundUser = await user.findById(userId);
        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const hasStaffOrAgent = foundUser.staff.length > 0 || foundUser.companyagent.length > 0;

        res.status(200).json({
            success: true,
            hasStaffOrAgent,
            counts: {
                staff: foundUser.staff.length,
                agents: foundUser.companyagent.length
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Failed to check user staff/agents'
        });
    }
};


export const AddEmail = async (req, res) => {
    try {
        const { emailto, emailcc, _id, role } = req.body;

        // Find the user by ID
        const User = await user.findById(_id);

        // console.log(User)
        // Check if the user exists
        if (!User) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if the role matches
        if (role !== 'agent') {
            return res.status(403).json({
                success: false,
                message: 'You do not have access to update emails for this user',
            });
        }

        // Update email fields
        User.emailto = emailto;
        User.emailcc = emailcc;

        // Save the updated user
        await User.save();

        // Respond with success
        return res.status(200).json({
            success: true,
            message: 'Emails updated successfully',
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating emails',
        });
    }
}

export const getEmails = async (req, res) => {
    try {
        const { _id, role } = req.query;

        // Validate input
        if (!_id || !role) {
            return res.status(400).json({
                success: false,
                message: 'User ID and role are required',
            });
        }

        // Find the user by ID
        const User = await user.findById(_id);

        // Check if the User exists
        if (!User) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Validate role
        if (role !== 'agent') {
            return res.status(403).json({
                success: false,
                message: 'You do not have access to update emails',
            });
        }

        // Respond with email data
        return res.status(200).json({
            success: true,
            message: 'Email data retrieved successfully',
            data: {
                emailto: User.emailto,
                emailcc: User.emailcc,
            },
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching email data',
        });
    }
};


export const GetEmailLogs = async (req, res) => {
    try {
        const { page = 1, limit = 10, userId, search } = req.query; // Get page and limit from query parameters (default: page=1, limit=10)

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const skip = (pageNumber - 1) * pageSize;

        const logs = await EmailLog.find({
            userId,
            $or: [
                { emailTo: { $regex: search, $options: 'i' } },
                { emailCC: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } }
            ]
        })
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean();

        const totalLogs = await EmailLog.countDocuments({ userId });

        res.status(200).json({
            success: true,
            data: logs,
            pagination: {
                total: totalLogs,
                page: pageNumber,
                limit: pageSize,
                totalPages: Math.ceil(totalLogs / pageSize),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch email logs',
            error: error.message || 'Internal server error',
        });
    }
}


export const GeneratePdfController = async (req, res) => {
    try {
        const { type, id, assessment_id } = req.query;
        let pdfBuffer = await GeneratePdf(type, id, {}, assessment_id);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
        return res.end(pdfBuffer);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate pdf',
            error: error.message || 'Internal server error',
        });
    }
}



export const fetchUserDetails = async (req, response) => {
    try {

        const { _id, role } = req.query;
        let User
        let res
        if (['staff', 'company-staff'].includes(role)) {
            User = await Staff.findOne({ _id: new mongoose.Types.ObjectId(_id), status: 0 }, { password: 0 }).populate({ path: 'addedBy', select: '_id fname lname role email phonenumber' })
            if (!User) {
                return response.status(404).json({
                    success: false,
                    message: 'User Not found',

                });
            }

            let addedBy_user = await user.findById(new mongoose.Types.ObjectId(User?.addedBy), { password: 0 }).lean()
            if (['agent'].includes(addedBy_user?.role) && [0].includes(addedBy_user?.status) && [0].includes(addedBy_user?.isMainMA)) {
                return response.status(401).send({ message: 'Access denied!', severity: 'error' });
            }
            res = {
                success: true,
                user: {
                    coruspondingEmail: addedBy_user?.coruspondingEmail,
                    username: User?.username,
                    addedBy: User?.addedBy,
                    address: User.address,
                    fname: User.fname,
                    lname: User.lname,
                    email: User.email,
                    role: User.role,
                    _id: User._id,
                    permmission: User?.permission,
                },
            }
        } else {
            User = await user.findOne({ _id: new mongoose.Types.ObjectId(_id) }, { password: 0 }).lean()

            if (!User) {
                return response.status(404).json({
                    success: false,
                    message: 'User Not found',

                });
            }

            if (['agent'].includes(User?.role) && [0].includes(User?.status) && [0].includes(User?.isMainMA)) {
                return response.status(401).send({ message: 'Access denied!', severity: 'error' });
            }


            res = {
                success: true,
                user: {
                    coruspondingEmail: User?.coruspondingEmail,
                    address: User.address,
                    fname: User.fname,
                    lname: User.lname,
                    email: User.email,
                    role: User.role,
                    _id: User._id,
                    companyname: User?.companyname,
                    isMainMA: User?.isMainMA,
                    status: User?.status,
                    emailto: User?.emailto,
                    emailcc: User?.emailcc,
                },
            }
            let agentCount = { active: 0, inactive: 0 }
            if (['agent'].includes(User?.role) && [1].includes(User?.isMainMA)) {
                const agentCounts = await user.aggregate([
                    {
                        $match: {
                            delStatus: 0,
                            isMainMA: 0,
                            role: 'agent',
                            _id: { $ne: new mongoose.Types.ObjectId(_id) }
                        }
                    },
                    {
                        $group: {
                            _id: '$status',
                            count: { $sum: 1 }
                        }
                    }
                ]);

                agentCounts.forEach(count => {
                    if (count._id === 1) {
                        agentCount.active = count.count;
                    } else {
                        agentCount.inactive = count.count;
                    }
                });

                res.user = { ...res?.user, ...agentCount }
            }
        }
        return response.status(200).send(res)
    } catch (error) {
        // console.log(error);

        response.status(500).json({
            success: false,
            message: 'Failed to fetch email logs',
            error: error.message || 'Internal server error',
        });
    }
}


export const AgentDetails = async (req, res) => {
    try {
        const { _id, page = 1, limit = 10, search = '' } = req.query;
        // Calculate skip value for pagination
        const skip = (page - 1) * limit;
        // const data = await user.aggregate([
        //     {
        //         $match: {
        //             isMainMA: 0,
        //             role: 'agent',
        //             ...(search && {
        //                 $or: [
        //                     { lame: { $regex: search, $options: 'i' } }, // Search in the name field (case insensitive)
        //                     { fame: { $regex: search, $options: 'i' } }, // Search in the name field (case insensitive)
        //                     { email: { $regex: search, $options: 'i' } }, // Search in the email field
        //                 ],
        //             }),
        //         },
        //     },
        //     {
        //         $lookup: {
        //             from: 'properties',
        //             localField: '_id',
        //             foreignField: 'addedBy',
        //             as: 'propertiesDetails',
        //         },
        //     },
        //     {
        //         $lookup: {
        //             from: 'tenants',
        //             localField: '_id',
        //             foreignField: 'addedBy',
        //             as: 'tenantsDetails',
        //         },
        //     },
        //     {
        //         $addFields: {
        //             propertyCount: { $size: '$propertiesDetails' },
        //             tenantCount: { $size: '$tenantsDetails' },
        //         },
        //     },
        //     {
        //         $project: {
        //             _id: 1,
        //             lname: 1,
        //             fname: 1,
        //             email: 1,
        //             propertyCount: 1,
        //             tenantCount: 1,
        //             createdAt: 1,
        //             status: 1
        //         },
        //     },
        //     // Pagination
        //     { $skip: skip },
        //     { $limit: Number(limit) },
        // ]);
        const data = await user.aggregate([
            {
                $match: {
                    delStatus: 0,
                    isMainMA: 0,
                    role: 'agent',
                    ...(search && {
                        $or: [
                            { lname: { $regex: search, $options: 'i' } },
                            { fname: { $regex: search, $options: 'i' } },
                            { email: { $regex: search, $options: 'i' } },
                        ],
                    }),
                },
            },
            {
                $lookup: {
                    from: 'properties',
                    localField: '_id',
                    foreignField: 'addedBy',
                    as: 'propertiesDetails',
                },
            },
            {
                $lookup: {
                    from: 'tenants',
                    localField: '_id',
                    foreignField: 'addedBy',
                    as: 'tenantsDetails',
                },
            },
            {
                $lookup: {
                    from: 'staffs',
                    localField: '_id',
                    foreignField: 'addedBy',
                    as: 'staffDetails',
                },
            },
            {
                $lookup: {
                    from: 'properties',
                    localField: 'staffDetails._id', // Look for properties added by staff
                    foreignField: 'addedBy',
                    as: 'staffProperties',
                },
            },
            {
                $lookup: {
                    from: 'tenants',
                    localField: 'staffDetails._id', // Look for tenants added by staff
                    foreignField: 'addedBy',
                    as: 'staffTenants',
                },
            },
            {
                $addFields: {
                    propertyCount: { $size: '$propertiesDetails' },
                    tenantCount: { $size: '$tenantsDetails' },
                    staffPropertyCount: { $size: '$staffProperties' },
                    staffTenantCount: { $size: '$staffTenants' },
                    totalPropertyCount: {
                        $add: [
                            { $size: '$propertiesDetails' },
                            { $size: '$staffProperties' },
                        ],
                    },
                    totalTenantCount: {
                        $add: [
                            { $size: '$tenantsDetails' },
                            { $size: '$staffTenants' },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: '$_id',
                    lname: { $first: '$lname' },
                    fname: { $first: '$fname' },
                    email: { $first: '$email' },
                    propertyCount: { $first: '$propertyCount' },
                    tenantCount: { $first: '$tenantCount' },
                    staffPropertyCount: { $first: '$staffPropertyCount' },
                    staffTenantCount: { $first: '$staffTenantCount' },
                    totalPropertyCount: { $first: '$totalPropertyCount' },
                    totalTenantCount: { $first: '$totalTenantCount' },
                    createdAt: { $first: '$createdAt' },
                    status: { $first: '$status' },
                },
            },
            // Pagination
            { $skip: skip },
            { $limit: Number(limit) },
            { $sort: { createdAt: 1 } }
        ]);

        // Total count for pagination metadata
        const total = await user.countDocuments({
            delStatus: 0,
            isMainMA: 0,
            role: 'agent',
            ...(search && {
                $or: [
                    { lname: { $regex: search, $options: 'i' } },
                    { fname: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { companyname: { $regex: search, $options: 'i' } },
                ],
            }),
        });

        // Send paginated data with metadata
        res.send({
            data,
            success: true,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        return HandleError(req, res, error); // Ensure HandleError is implemented
    }
};



export const hanndleAgentStatus = async (req, res) => {
    try {
        const { agentid, ma_id, status } = req.query;

        const updateStatus = await user.findByIdAndUpdate(agentid, { status })
        if (!updateStatus) {
            return HandleError(req, res, {}, 401, 'Agent Status is not Updated')
        } else {
            res.send({ message: 'agent status updated Successfully...' })
        }
    } catch (error) {
        console.log(error)
        return HandleError(req, res, error)
    }
}