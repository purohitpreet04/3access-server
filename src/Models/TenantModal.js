import mongoose, { isValidObjectId } from "mongoose";
import Tenants from "../DB/Schema/TenantsSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import Property from "../DB/Schema/PropertySchema.js";

export const getTenantDetailsandUpdate = async (_id, updatedData) => {
    if (!isValidObjectId(_id)) return null
    let tenant;

    tenant = await Tenants.findByIdAndUpdate(_id, { ...updatedData })

    return tenant
}
export const getTenantDetails = async (_id) => {
    if (!isValidObjectId(_id)) return null
    let tenant;

    tenant = await Tenants.findById(_id)

    return tenant
}

export const handleNotActiveTenants = async (_id) => {
    let query = {};
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


    return tenants;

}
export const handleActiveTenants = async (_id) => {
    let query = {};
    const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
    const staffIds = staffMembers.map(staff => staff._id);

    query = {
        $and: [
            { status: 1 },
            { isSignOut: 0 },
            {
                $or: [
                    { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'User' },
                    { addedBy: { $in: staffIds }, addedByModel: 'Staff' }
                ]
            }
        ]
    };

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


    return tenants;

}



export const handleDeleteExportedData = async (ids = [], userId) => {
    try {
        if (ids.length == 0) return null
        let tenantIds = [...ids];

        let deleteData = await Promise.all(
            tenantIds.map(async (_id) => {
                let property
                let tenant = await getTenantDetailsandUpdate(_id, { isDeleted: 1 });
                let isActiveTenanat = await Tenants.find({ property: tenant?.property, isDeleted: 0, isSignOut: 0 })

                if (isActiveTenanat.length == 0) {
                    property = await Property.findByIdAndUpdate(tenant?.property, { isDeleted: 1, status: 1 })
                } else {
                    let date = new Date()
                    property = await Property.findByIdAndUpdate(
                        tenant?.property,
                        {
                            $pull: { tenants: { tenant_id: tenant?._id } }
                        }, { new: true }
                    );
                    // await Property.findByIdAndUpdate(
                    //     tenant?.property,
                    //     {
                    //         $push: { tenants: { roomNo: parseInt(tenant?.room), lastsignoutdate: date.toISOString() } }
                    //     }
                    // );
                }

                return { t: tenant?._id, p: property?._id };
            })
        );

        return deleteData; // Optional: return deleted data for logging or confirmation
    } catch (error) {
        console.error('Error in handleDeleteExportedData');
        return null
        // throw error; // Rethrow error if needed for further handling
    }
};


export const handleBulkDeleteData = async (_id, addedByModal) => {
    try {
        let query;
        let proQuery;
        if (['User'].includes(addedByModal)) {
            const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
            const staffIds = staffMembers.map(staff => staff._id);
            query = {
                $and: [
                    { isSignOut: 0 },
                    { isDeleted: 0 },
                    { approved_status: 1 },
                    {
                        $or: [
                            { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'User' },
                            { addedBy: { $in: staffIds }, addedByModel: 'Staff' }
                        ]
                    }
                ]
            };
            proQuery = {
                $and: [

                    { isDeleted: 0 },
                    { status: 0 },
                    {
                        $or: [
                            { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'User' },
                            { addedBy: { $in: staffIds }, addedByModel: 'Staff' }
                        ]
                    }
                ]
            };
        } else if (['Staff'].includes(addedByModal)) {
            const staffMembers = await Staff.findOne({ _id }).select('permission').lean();
            if (!staffMembers?.permission.includes(5)) {
                return res.status(403).json({ message: 'Access Denied', success: false });
            }
            query = {
                $and: [
                    { isSignOut: 0 },
                    { isDeleted: 0 },
                    { approved_status: 1 },
                    { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'Staff' }
                ]
            };
            proQuery = {
                $and: [
                    { isDeleted: 0 },
                    { status: 0 },
                    { addedBy: new mongoose.Types.ObjectId(_id), addedByModel: 'Staff' }
                ]
            };
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }

        let updatedTenants = await Tenants.updateMany(query, { isDeleted: 1 })
        let updateProperty = await Property.updateMany(proQuery, { $set: { isDeleted: 1, tenants: [] } })

        return { updatedTenants, updateProperty }

    } catch (error) {
        console.error('Error in handleBulkDeleteData');
        return null
    }
}