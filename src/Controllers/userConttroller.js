import { EmailLog } from "../DB/Schema/EmailLogSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import user from "../DB/Schema/userSchema.js";

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
            data = await user.find({ _id: addedBy, role: 'agent' }, 'selectedData');
        }
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

        // Check if the user exists
        if (!User) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if the role matches
        if (User.role !== role) {
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
        if (User.role !== role) {
            return res.status(403).json({
                success: false,
                message: 'You do not have access to view this User\'s email data',
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
        const { page = 1, limit = 10,userId, search } = req.query; // Get page and limit from query parameters (default: page=1, limit=10)

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Parse pagination values
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const skip = (pageNumber - 1) * pageSize;

        // Fetch logs with pagination
        const logs = await EmailLog.find({
            $or: [
              { emailTo: { $regex: search, $options: 'i' } },
              { emailCC: { $regex: search, $options: 'i' } },
              { subject: { $regex: search, $options: 'i' } }
            ]
          })
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(pageSize)
            .lean();

        // Count total logs for the user
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
        // console.error('Error fetching email logs:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch email logs',
            error: error.message || 'Internal server error',
        });
    }
}