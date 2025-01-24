import { isObjectIdOrHexString } from "mongoose";
import Property from "../DB/Schema/PropertySchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import user from "../DB/Schema/userSchema.js";

export const GetallProperty = async (req, res) => {
    try {

        const { addedBy: _id, role, search, page, limit, staffAddedBy, staffAddedByrole } = req.query;
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


        if (['agent', 'company'].includes(role)) {

            const staffMembers = await Staff.find({ addedBy: _id }).select('_id').lean();
            const staffIds = staffMembers.map(staff => staff._id);

            query = {
                $and: [
                    searchConditions,
                    { status: 0 },
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

        const properties = await Property.find(query)
            .populate({
                path: 'tenants.tenant_id',
                select: 'lastName firstName isSignOut claimReferenceNumber bedrooms signOutDate',
                match: { approved_status: 1, isSignOut: 0 }
            })
            .populate({ path: 'addedBy', select: 'fname lname companyname role addedBy' })
            .populate({ path: 'rslTypeGroup', select: "companyname" })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .lean();
        if (!properties || properties.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No properties found',
            });
        }
        let totalRooms = properties.reduce((acc, cur) => acc + cur.bedrooms, 0);
        let totalProperty = properties.length;
        let activeTenants = properties.reduce((acc, cur) => acc + cur.tenants.filter(tenant => tenant.tenant_id).length, 0);
        let voidRooms = totalRooms - activeTenants
        // let voidRooms = properties.reduce((acc, cur) => acc + cur.tenants.filter(tenant => !tenant.tenant_id).length, 0);
        // console.log(totalRooms)
        const formattedProperties = await Promise.all(properties.map(async (property) => {
            // totalRooms = totalRooms += property.bedrooms
            // property.tenants.forEach(tenant => {
            //     if (tenant.isSignOut === 0) {
            //         activeTenants++
            //     }
            // })
            const roomObject = {};  // Object to hold rooms by room number
            for (let i = 1; i <= property.bedrooms; i++) {
                roomObject[`room${i}`] = {}
                property.tenants.forEach(tenant => {

                    let roomKey = `room${i}`;
                    if (tenant?.tenant_id && tenant?.roomNo === i) {
                        roomObject[roomKey] = {
                            tenant_id: tenant.tenant_id,
                            roomNo: tenant.roomNo,
                        };
                    } else {
                        if (tenant?.roomNo === i && tenant?.lastsignoutdate) {
                            roomObject[roomKey] = {
                                lastsignoutdate: tenant?.lastsignoutdate,
                                roomNo: tenant.roomNo,
                            };
                        }
                    }

                });

            }

            return {
                _id: property._id,
                companyname: property?.rslTypeGroup?.companyname,
                address: property?.address,
                ...roomObject,
                addedBy: property?.addedBy,
            }

        }));

        const totalProperties = await Property.countDocuments(query);
        // console.log(formattedProperties)
        res.status(200).json({
            success: true,
            message: 'Properties fetched successfully',
            data: formattedProperties,
            total: totalProperties,
            totalPages: Math.ceil(totalProperties / limitNumber),
            currentPage: pageNumber,
            stackcards: {
                activeTenants, totalProperty, voidRooms, totalRooms
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch property' });
    }
}