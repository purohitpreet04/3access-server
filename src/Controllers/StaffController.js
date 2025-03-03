
import bcrypt from 'bcryptjs';
import mongoose, { Mongoose } from 'mongoose';
import Staff from '../DB/Schema/StaffSchema.js';
import user from '../DB/Schema/userSchema.js';
import Property from '../DB/Schema/PropertySchema.js';
import logUserAction from './ActivityController.js';
import TaskSchema from '../DB/Schema/TaskSchema.js';


export const AddNewStaff = async (req, res) => {
    const { coruspondingEmail, _id, jobTitle, fname, lname, phonenumber, gender, username, email, password, companyEmail, role, addedBy, permission, Property_per } = req.body;

    const staffData = {
        coruspondingEmail,
        jobTitle,
        fname,
        lname,
        phonenumber,
        gender,
        username,
        email,
        companyEmail,
        role,
        addedBy,
        permission,
        password,
        Property_per,
    };

    if (password) {
        staffData.password = await bcrypt.hash(password, 10);
    }

    const upadatePropertyPermmission = async (userId) => {
        const currentProperties = await Property.find(
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
            await Property.updateMany(
                { _id: { $in: toRemove } },
                { $pull: { visibleTo: userId } }
            );
        }

        if (toAdd.length > 0) {
            await Property.updateMany(
                { _id: { $in: toAdd } },
                { $addToSet: { visibleTo: userId } }
            );
        }

    }
    try {
        if (_id) {

            const updatedStaff = await Staff.findByIdAndUpdate(_id, staffData, { new: true, runValidators: true });
            if (!updatedStaff) {
                return res.status(404).json({ message: 'Staff not found', severity: 'error', success: false });
            }

            const existingUser = await Staff.findOne({
                $or: [
                    { username },
                    { phonenumber },
                    { email }
                ],
                _id: { $ne: _id } // Exclude the current user's _id
            });
            if (existingUser && existingUser._id.toString() !== _id) {
                return res.status(400).json({
                    message: 'Username or Email or Phonenumber already in use. Please choose another one.',
                    severity: 'error',
                    success: false,
                });
            }
            upadatePropertyPermmission(_id)
            await logUserAction(addedBy, 'EDIT', {
                username, fname,
                lname,
            }, 'Staff', updatedStaff._id, req.query.addedByModel);
            return res.status(200).json({ message: 'Staff updated successfully', severity: 'success', success: true });
        } else {
            const existingUser = await Staff.findOne({
                $or: [
                    { username },
                    { phonenumber },
                    { email }
                ],
                _id: { $ne: _id } // Exclude the current user's _id
            });
            if (existingUser && existingUser._id.toString() !== _id) {
                return res.status(400).json({
                    message: 'Username or email or phonenumber already in use. Please choose another one.',
                    severity: 'error',
                    success: false,
                });
            }
            const newStaff = new Staff(staffData);

            const newStaffdata = await newStaff.save();
            if (newStaffdata?._id) {
                upadatePropertyPermmission(newStaffdata?._id)
                await user.findByIdAndUpdate(addedBy, { $addToSet: { [role === 'company-agent' ? "companyagent" : "staff"]: newStaffdata?._id } })
            }
            await logUserAction(addedBy, 'ADD', {
                username, fname,
                lname,
            }, 'Staff', newStaffdata._id, req.query.addedByModel);
            res.status(201).json({ message: 'Staff added successfully', severity: 'sucsess', success: true });
        }
    } catch (error) {


        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors, severity: 'error', success: false });
        }

        if (error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate username or email or Phonenumber', field: Object.keys(error.keyValue)[0], severity: 'error', success: false });
        }
        res.status(500).json({ message: 'Internal server error', severity: 'error', success: false });
    }
}


export const ListStaff = async (req, res) => {

    const { _id, search, page = 1, limit = 10, filterby, status } = req.query;

    try {
        const filter = {};
        if (_id) {
            filter['addedBy'] = new mongoose.Types.ObjectId(_id);
        }
        if (filterby) {
            filter['role'] = filterby
        }
        // Ensure status is a valid integer before applying the filter
        // if (status !== undefined && !isNaN(status)) {
        //     filter.status = 2;
        // }
        if (search) {
            const searchRegex = { $regex: search, $options: 'i' };
            filter.$or = [
                { firstName: searchRegex },
                { jobTitle: searchRegex },
                { lastName: searchRegex },
                { email: searchRegex },
                { username: searchRegex },
            ];
        }

        let skip
        if (page > 1) {
            skip = (page - 1) * limit;
        } else {
            skip = 0
        }

        const staffList = await Staff.aggregate([
            { $match: { ...filter, status: Number(status) } },
            { $project: { password: 0 } },
            { $skip: parseInt(skip) },
            { $limit: parseInt(limit) },
            { $sort: { 'createdAt': 1 } }
        ]);

        // Get total count for pagination
        const totalCount = await Staff.countDocuments(filter);
        if (staffList.length > 0) {

            res.status(201).json({
                success: true,
                totalCount,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / limit),
                staff: staffList,
            });
        } else {
            res.status(201).json({
                success: false,
                totalCount: 0,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / limit),
                staff: [],
            });
        }
    } catch (error) {


        res.status(500).json({ success: false, message: 'Server Error', severity: 'error' });
    }
}

export const GetManegingAgentandcompany = async (req, res) => {
    try {
        const { role } = req.query;
        let result;

        if (role === 'company') {
            result = await user.aggregate([
                { $match: { role: 'agent' } },

                {
                    $addFields: {
                        lable: {
                            $concat: [
                                { $ifNull: ["$fname", ""] },
                                " ",
                                { $ifNull: ["$lname", ""] }
                            ]
                        }
                    }
                },
                {
                    $project: {
                        // fname: 1,
                        // lname: 1,
                        phonenumber: 1,
                        email: 1,
                        // companyname: 1,
                        lable: 1 // Directly assign companyname to name
                    }
                }
            ]);
        } else if (role === 'agent') {
            result = await user.aggregate([
                { $match: { role: 'company' } },
                { $addFields: { lable: "$companyname" } },
                {
                    $project: {
                        phonenumber: 1,
                        email: 1,
                        lable: 1
                    }
                }
            ]);
        }

        if (result && result.length > 0) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(200).json({ success: false, data: [], message: 'No data found for the specified role.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', severity: 'error' });
    }
};




// ... existing code ...

export const DeleteStaff = async (req, res) => {
    const { staffId, granted } = req.query;


    try {
        const visible_Pro = await Property.find(
            { visibleTo: { $in: staffId } },
        );
        if (granted == 0) {
            if (visible_Pro?.length != 0) {
                return res.status(200).json({
                    success: false,
                    property: visible_Pro.length,
                    severity: 'error'
                });
            }
        }

        if (granted == 1) {
            if (!mongoose.Types.ObjectId.isValid(staffId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid staff ID format',
                    severity: 'error'
                });
            }


            const deletedStaff = await Staff.findByIdAndUpdate(
                staffId,
                { status: 1 },
                { new: true }
            );

            if (!deletedStaff) {
                return res.status(404).json({
                    success: false,
                    message: 'Staff member not found',
                    severity: 'error'
                });
            }

            await user.updateMany(
                { _id: deletedStaff?.addedBy },
                {
                    $pull: {
                        companyagent: staffId,
                        staff: staffId
                    }
                }
            );
            const userId = req.headers['user']
            // Remove staff's visibility from properties
            await Property.updateMany(
                { visibleTo: staffId },
                { $pull: { visibleTo: staffId } }
            );
            await logUserAction(userId, 'DELETE', {
                username: deletedStaff?.username, fname: deletedStaff?.fname,
                lname: deletedStaff?.lname,
            }, 'Staff', deletedStaff._id, req.query.addedByModel);
            return res.status(200).json({
                success: true,
                message: 'Staff member deleted successfully',
                severity: 'success'
            });

        }
        // return res.send(200)


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            severity: 'error'
        });
    }
};


export const ArchiveStaff = async (req, res) => {
    const { staffId } = req.query;

    try {
        if (!mongoose.Types.ObjectId.isValid(staffId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid staff ID format',
                severity: 'error'
            });
        }

        const archivedStaff = await Staff.findByIdAndUpdate(
            staffId,
            { status: 2 },
            { new: true }
        );

        if (!archivedStaff) {
            return res.status(404).json({
                success: false,
                message: 'Staff member not found',
                severity: 'error'
            });
        }

        await user.updateMany(
            { _id: archivedStaff?.addedBy },
            {
                $pull: {
                    companyagent: staffId,
                    staff: staffId
                }
            }
        );

        // // Remove staff's visibility from properties
        // await Property.updateMany(
        //     { visibleTo: staffId },
        //     { $pull: { visibleTo: staffId } }
        // );

        await logUserAction(req.headers['user'], 'ARCHIVE', {
            username: archivedStaff?.username, fname: archivedStaff?.fname,
            lname: archivedStaff?.lname,
        }, 'Staff', archivedStaff._id, req.query.addedByModel);

        return res.status(200).json({
            success: true,
            message: 'Staff member archived successfully',
            severity: 'success'
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            severity: 'error'
        });
    }
}

export const Restorestaff = async (req, res) => {
    let { staffId } = req.query;
    try {
        if (!mongoose.Types.ObjectId.isValid(staffId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid staff ID format',
                severity: 'error'
            });
        }

        const unarchivedStaff = await Staff.findByIdAndUpdate(
            staffId,
            { status: 0 },
            { new: true }
        );

        if (!unarchivedStaff) {
            return res.status(404).json({
                success: false,
                message: 'Staff member not found',
                severity: 'error'
            });
        }

        await user.updateMany(
            { _id: unarchivedStaff?.addedBy },
            {
                $push: {
                    companyagent: staffId,
                    staff: staffId
                }
            }
        );

        // // Remove staff's visibility from properties
        // await Property.updateMany(
        //     { visibleTo: staffId },
        //     { $pull: { visibleTo: staffId } }
        // );

        await logUserAction(req.headers['user'], 'Restore', {
            username: unarchivedStaff?.username, fname: unarchivedStaff?.fname,
            lname: unarchivedStaff?.lname,
        }, 'Staff', unarchivedStaff._id, req.query.addedByModel);

        return res.status(200).json({
            success: true,
            message: 'Staff member restored successfully',
            severity: 'success'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            severity: 'error'
        });
    }
}


export const transferWork = async (req, res) => {
    try {
        const { staffId, newStaffId, status, unavailableFrom, unavailableTo, reason, taskDescription } = req.body;

        if (!staffId || !newStaffId || !status || !['holiday', 'ill', 'fired'].includes(status)) {
            return res.status(400).json({ message: 'Invalid or missing input data' });
        }

        const staff = await Staff.findById(staffId);
        const newStaff = await Staff.findById(newStaffId);

        if (!staff || !newStaff) {
            return res.status(404).json({ message: 'One or both staff members not found' });
        }

        staff.unavailabilityStatus = status;
        staff.unavailablefrom = unavailableFrom || Date.now();
        staff.unavailableto = unavailableTo || null; // If no end date, keep it null
        staff.unavailabilityReason = reason || 'Not specified';
        staff.permission = []; // Revoke all permissions
        await staff.save();

        // Find all tasks assigned to the old staff
        const tasks = await TaskSchema.find({ assignedTo: staffId });

        // Reassign tasks to new staff
        for (const task of tasks) {
            task.assignedTo = newStaffId;
            task.description = taskDescription;
            await task.save();

            // Log reassignment in the staff model
            staff.reassignedTasks.push({
                taskId: task._id,
                reassignedTo: newStaffId,
            });
        }
        await staff.save();

        // Transfer permissions (merge without duplicates)
        newStaff.permission = [...new Set([...newStaff.permission, ...staff.permission])];
        await newStaff.save();

        return res.status(200).json({
            message: `Tasks reassigned from ${staff.fname} to ${newStaff.fname}, and permissions updated.`,
        });

    } catch (error) {
        console.error('Error reassigning work:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};