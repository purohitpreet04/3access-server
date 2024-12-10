import ActionLog from "../DB/Schema/ActivitySchema.js";
import Property from "../DB/Schema/PropertySchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import Tenants from "../DB/Schema/TenantsSchema.js";

const logUserAction = async (userId, actionType, affectedData, entityType, entityId, addedByModel) => {
    try {
        const actionLog = new ActionLog({
            addedByModel,
            userId,
            actionType,
            affectedData,
            entityType,
            entityId, // The entity's unique identifier
        });
        await actionLog.save();
    } catch (error) {
        console.error('Error logging user action');
    }
};

export default logUserAction;



export const getUserLogs = async (req, res) => {
    const { userId, page = 1, limit = 10, filterby, search } = req.query;

    try {
        // Parse page and limit
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);

        if (isNaN(pageNumber) || isNaN(pageSize)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid page or limit parameter.',
            });
        }

        // Build query
        const query = {
            userId,
            $or: [
                { actionType: { $regex: search, $options: 'i' } },
                { entityType: { $regex: search, $options: 'i' } },
            ],
        };

        if (filterby) {
            query['actionType'] = filterby;
        }

        // Fetch logs with pagination
        const logs = await ActionLog.find(query)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .sort({ timestamp: -1 });

        const fetchTemplateData = async (log) => {
            let description = '';
            switch (log.entityType) {
                case 'Property': {
                    const property = await Property.findById(log.entityId).select('address area city postCode');
                    const propertyAddress = property
                        ? `${property.address}, ${property.area}, ${property.city}, ${property.postCode}`
                        : 'unknown property';

                    if (log.actionType === 'ADD') {
                        description = `A property was added at ${propertyAddress}.`;
                    } else if (log.actionType === 'EDIT') {
                        description = `The property at ${propertyAddress} was edited.`;
                    } else if (log.actionType === 'DELETE') {
                        description = `The property at ${propertyAddress} was deleted.`;
                    }
                    return {
                        ...log.toObject(),
                        templateData: property,
                        description,
                    };
                }

                case 'Tenant': {
                    // const tenant = await Tenants.findById(log.entityId).select('name email phone propertyId roomNumber');
                    // const property = tenant
                    //     ? await Property.findById(tenant.property).select('address area city')
                    //     : null;
                    const propertyAddress =  `${log?.affectedData?.address}, ${log?.affectedData?.area}, ${log?.affectedData?.city} ${log?.affectedData?.postCode}` || ''
                        

                    if (log.actionType === 'ADD') {
                        description = `Tenant ${log?.affectedData?.fname} ${log?.affectedData?.lname} was added to the property at ${propertyAddress}, room ${log?.affectedData?.room}.`;
                    } else if (log.actionType === 'EDIT') {
                        description = `Details of tenant ${log?.affectedData?.fname} ${log?.affectedData?.lname} at ${propertyAddress} were edited.`;
                    } else if (log.actionType === 'DELETE') {
                        description = `Tenant ${log?.affectedData?.fname} ${log?.affectedData?.lname} was removed from the property at ${propertyAddress}.`;
                    }
                    return {
                        ...log.toObject(),
                        // templateData: tenant,
                        description,
                    };
                }

                case 'Staff': {
                    const staff = await Staff.findById(log.entityId).select('fname lname username email');
                    const staffName = staff ? `${staff.fname} ${staff.lname}` : 'unknown staff';

                    if (log.actionType === 'ADD') {
                        description = `Staff member ${staffName} (${staff?.username}) was added.`;
                    } else if (log.actionType === 'EDIT') {
                        description = `Details of staff member ${staffName} (${staff?.username}) were edited.`;
                    } else if (log.actionType === 'DELETE') {
                        description = `Staff member ${staffName} (${staff?.username}) was removed.`;
                    }
                    return {
                        ...log.toObject(),
                        templateData: staff,
                        description,
                    };
                }

                default:
                    description = 'No detailed description available for this action.';
                    return { ...log.toObject(), description };
            }
        };

        // Fetch detailed data for all logs
        const modifiedLogs = await Promise.all(logs.map(fetchTemplateData));

        // Get total logs count for pagination
        const totalLogs = await ActionLog.countDocuments(query);

        return res.json({
            success: true,
            data: modifiedLogs,
            totalLogs,
            totalPages: Math.ceil(totalLogs / pageSize),
            currentPage: pageNumber,
        });
    } catch (error) {
        // console.error('Error fetching user logs:', error);s
        return res.status(500).json({
            success: false,
            message: 'Error fetching activity logs.',
            error: error.message,
        });
    }
};
