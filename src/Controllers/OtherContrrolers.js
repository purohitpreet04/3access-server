import Property from "../DB/Schema/PropertySchema";
import Staff from "../DB/Schema/StaffSchema";

export const getDashboardCounts = async (req, res) => {
    try {
        const _id = req.query;

        const propertiesCount = await Property.countDocuments({ addedBy: _id });

        const staffCount = await Staff.countDocuments({ addedBy: _id });

        res.status(200).json({
            success: true,
            data: {
                propertiesCount,
                staffCount,
            },
        });
    } catch (error) {
        // console.error('Error fetching dashboard counts:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
};