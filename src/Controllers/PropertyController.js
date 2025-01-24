import mongoose from "mongoose";
import Property from "../DB/Schema/PropertySchema.js";
import user from "../DB/Schema/userSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import logUserAction from "./ActivityController.js";
import RSL from "../DB/Schema/RSLSchema.js";
import Tenants from "../DB/Schema/TenantsSchema.js";

export const AddnewProperty = async (req, res) => {
    try {
        const { _id, addedBy, addedByModel, ...propertyData } = req.body;

        if (!['User', 'Staff'].includes(addedByModel)) {
            return res.status(400).json({ error: 'Invalid addedByModel. Must be "User" or "Staff".' });
        }

        if (_id) {
            const existingProperty = await Property.findById(_id);
            if (!existingProperty) {
                return res.status(404).json({ message: 'Property not found', seviority: 'error', success: false });
            }

            Object.assign(existingProperty, propertyData, { addedBy, addedByModel });
            await existingProperty.save();
            await logUserAction(addedBy, 'EDIT', {
                councilTaxPayer: propertyData.councilTaxPayer,
                address: propertyData?.addresss,
                area: propertyData?.area,
                city: propertyData?.city,
                postCode: propertyData?.postCode
            }, 'Property', existingProperty._id, addedByModel);
            return res.status(200).json({ message: 'Property updated successfully', seviority: 'success', success: true });

        } else {
            let visibleTo = []
            if (['Staff'].includes(addedByModel)) {
                visibleTo.push(addedBy)
            }
            const newProperty = new Property({ ...propertyData, addedBy, addedByModel, visibleTo });
            await newProperty.save();
            await logUserAction(addedBy, 'ADD', {
                councilTaxPayer: propertyData.councilTaxPayer,
                address: propertyData?.addresss,
                area: propertyData?.area,
                city: propertyData?.city,
                postCode: propertyData?.postCode
            }, 'Property', newProperty._id, addedByModel);
            return res.status(201).json({ message: 'Property added successfully', seviority: 'success', success: true });
        }
    } catch (error) {
        console.error('Error in saveProperty:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

export const getAllComapny = async (req, res) => {
    try {
        const { _id } = req.query;
        const result = await user.find({ role: 'company' }, { password: 0 })
        if (result.length > 0) {
            return res.status(201).json({ data: result, success: true });
        } else {
            return res.status(201).json({ data: [], success: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

export const getAllProperty = async (req, res) => {
    const { _id, search, page = 1, limit = 10, filterby, role, staffAddedByrole, staffAddedBy } = req.query;
    try {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const searchConditions = search
            ? {
                $or: [
                    { address: { $regex: search, $options: 'i' } },
                    { city: { $regex: search, $options: 'i' } },
                    { postCode: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        let query;


        if (role === 'company' || role === 'agent') {

            const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
            const staffIds = staffMembers.map(staff => staff._id);

            query = {
                $and: [
                    { status: 0 },
                    searchConditions,
                    {
                        $or: [
                            { addedBy: _id },
                            { rslTypeGroup: _id },
                            { addedBy: { $in: staffIds }, addedByModel: 'Staff' }
                        ]
                    },
                ]
            };
        } else if (['staff', 'company-agent'].includes(role)) {
            // query = {
            //     $and: [
            //         // {visibleTo: { $in: _id }},
            //         { status: 0 },
            //         searchConditions,
            //         { addedBy: _id, addedByModel: 'Staff' },
            //     ],
            // };
            let otherQuery = {}
            if (['company'].includes(staffAddedByrole)) {
                otherQuery['rslTypeGroup'] = staffAddedBy
            }
            query = {
                visibleTo: { $in: _id },
                status: 0,
                $or: [
                    // {visibleTo: { $in: _id }},
                    searchConditions,
                    { addedBy: _id, addedByModel: 'Staff', ...otherQuery }
                ]
            };
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
        // console.log(query)
        const totalProperties = await Property.countDocuments(query);
        // console.log(query)
        const properties = await Property.find(query)
            .populate('addedBy', 'fname lname email role username area visibleTo')
            .populate('rslTypeGroup', 'companyname')
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .lean();
        const flattenedProperties = properties.map(property => {
            let tenantcount = property?.tenants.filter(tenant => tenant?.tenant_id).length
            if (property.addedBy) {
                let { _id,
                    address,
                    city,
                    area,
                    postCode,
                    rslTypeGroup,
                    role,
                    username,
                    createdAt,
                    sharedWithOther,
                    addedBy, visibleTo } = property
                const { _id: addedById, ...restdata } = addedBy;
                if (['agent'].includes(addedBy.role)) {
                    return {
                        _id,
                        address,
                        city,
                        area,
                        postCode,
                        rslTypeGroup: rslTypeGroup.companyname,
                        role,
                        username: `${addedBy?.fname} ${addedBy?.lname}`,
                        createdAt,
                        sharedWithOther,
                        addedById,
                        visibleTo,
                        tenants: tenantcount,
                        ...restdata,
                    };

                }
                return {
                    _id,
                    address,
                    city,
                    area,
                    postCode,
                    rslTypeGroup: rslTypeGroup.companyname,
                    role,
                    username,
                    createdAt,
                    sharedWithOther,
                    addedById,
                    visibleTo,
                    tenants: tenantcount,
                    ...restdata,
                };
            }
            return property;
        });

        res.status(200).json({
            totalCount: totalProperties,
            totalPages: Math.ceil(totalProperties / limitNumber),
            currentPage: pageNumber,
            result: flattenedProperties,
            success: true

        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to fetch properties', success: false });
    }
}


// Controller function to get property details for editing
export const getPropertyDetails = async (req, res) => {
    try {
        const { _id } = req.query;

        if (!_id) {
            return res.status(400).json({ message: 'Property ID is required' });
        }

        // Fetch the property by _id and populate the addedBy field if needed
        const property = await Property.findById(_id).lean();

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ success: true, result: property });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch property details' });
    }
};


export const deleteProperty = async (req, res) => {
    try {
        const { _id, addedByModel } = req.query;
        const deletedProperty = await Property.findOneAndUpdate({ _id }, { status: 1 });
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        const userId = req.headers['user']
        await logUserAction(userId, 'DELETE', {}, 'Property', _id, addedByModel);
        res.status(200).json({ message: 'Property deleted successfully', success: true });
    } catch (error) {
        // console.error(error);

        res.status(500).json({ message: 'Failed to delete property' });
    }
};



export const getAllpropertyforTenants = async (req, res) => {
    try {


        const { _id, role, staffAddedByrole, staffAddedBy } = req.query
        let query;


        if (['agent', 'company'].includes(role)) {

            const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
            const staffIds = staffMembers.map(staff => staff._id);

            query = {
                $and: [
                    { status: 0 },
                    // searchConditions,
                    {
                        $or: [
                            { addedBy: _id },
                            { rslTypeGroup: _id },
                            { addedBy: { $in: staffIds }, addedByModel: 'Staff' }
                        ]
                    },
                ]
            };
        } else if (['staff', 'company-agent'].includes(role)) {
            let otherQuery = {}
            if (['company'].includes(staffAddedByrole)) {
                otherQuery['rslTypeGroup'] = staffAddedBy
            }
            query = {
                visibleTo: { $in: _id },
                $or: [
                    // {visibleTo: { $in: _id }},
                    // searchConditions,
                    { status: 0 },
                    { addedBy: _id, addedByModel: 'Staff', ...otherQuery }
                ]
            };
        } else {
            return res.status(403).json({ message: 'Access Denied' });
        }
        const properties = await Property.find(query)

        const addresses = properties.map((pro) => {
            return (
                { address: `${pro.address}, ${pro.area}, ${pro.city}`, _id: pro._id, rooms: pro.bedrooms, rsl:pro?.rslTypeGroup }
            )
        })

        if (addresses.length !== 0) {
            res.status(201).send({ data: addresses, success: true })
        } else {
            res.status(201).send({ data: [], success: false })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Failed to fetch property' });
    }
}

export const CheckRoomAvebility = async (req, res) => {
    try {
        const { property_id, room } = req.query;

        if (!property_id || !room) {
            return res.status(400).json({
                message: 'Property and Room number are required',
                success: false,
            });
        }
        let isTenantExist;
        isTenantExist = await Tenants.findOne({ property: property_id, room, approved_status: 1, isSignOut: 0 }).lean()
        if (isTenantExist) {
            const { firstName, lastName, title_before_name } = isTenantExist;
            return res.send({
                isOccupide: true,
                success: true,
                message: `${title_before_name} ${firstName} ${lastName} is Already present in this room. Please mention the move out date.`,
            })
        } else {
            return res.send({
                isOccupide: false,
                success: true,
                // message: `${title_before_name} ${firstName} ${lastName} is Already in this room, Are you sure You want to sign up this tenant?`,
            })
        }

        // Fetch the property with tenants
        // const property = await Property.findById(property_id, { tenants: 1, bedrooms: 1 });
        // if (!property) {
        //     return res.status(404).json({
        //         message: 'Property not found',
        //         success: false,
        //     });
        // }
        // let isRoomOccupied = property.tenants.some(
        //     (tenant) => tenant.roomNo === parseInt(room, 10)
        // );
        // let rooms = Array.from({ length: property.bedrooms }, (_, i) => i + 1);
        // isRoomOccupied = false;
        // if (property.tenants.length == 0) {
        //     return res.status(200).json({
        //         success: true,
        //         rooms,
        //         isRoomOccupied,
        //         message: `All rooms are available`,
        //     });
        // } else {
        //     let unOccupiedRooms = new Set()
        //     rooms.forEach((room) => {
        //         const isRoomUnoccupied = !property.tenants.some((tenant) => tenant.roomNo === room);
        //         const hasInvalidTenant = property.tenants.some((tenant) => tenant.roomNo === room && (!tenant.tenant_id && tenant?.lastsignoutdate));
        //         if (isRoomUnoccupied || hasInvalidTenant) {
        //             unOccupiedRooms.add(room);

        //         }
        //     });
        //     const roomArray = Array.from(unOccupiedRooms);
        //     return res.send({
        //         success: true,
        //         rooms: roomArray.sort((a, b) => a - b),
        //         isRoomOccupied,
        //         message: `${roomArray.length} rooms are available`,
        //     })
        // }
    } catch (error) {
        // console.error('Error checking room availability:', error);
        res.status(500).json({
            message: 'Failed to check room availability',
            success: false,
            error: error.message,
        });
    }
};
