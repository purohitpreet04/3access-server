import Tenants from "../DB/Schema/TenantsSchema.js";
import CheckStatus from "./Sracper.js";
import fs from 'fs';

// export const checkTenatStatus = async () => {
//     try {

//         const tenants = await Tenants.find({
//             approved_status: 1,
//             isSignOut: 0,
//             claimReferenceNumber: { $ne: '' },
//             nationalInsuranceNumber: { $ne: '' },
//             status: { $exists: false }
//         }, {
//             firstName: 1,
//             lastName: 1,
//             nationalInsuranceNumber: 1,
//             claimReferenceNumber: 1,
//             property: 1,
//             dateOfBirth: 1
//         }).populate({
//             path: 'property',
//             select: 'postCode'
//         })
//             .lean()
//             .exec();
//         if (tenants.length === 0) {
//             return
//         }

//         for (let TenUser of tenants) {
//             await CheckStatus(TenUser).then(async (res) => {
//                 await Tenants.findByIdAndUpdate(TenUser?._id, { ...res })

//             }).catch((error) => {
//                 console.log(error)
//             })
//         }

//     } catch (error) {
//         // console.log(error)
//         console.log('error in cron job')
//     }
// }

export const checkTenatStatus = async () => {
    try {
        const tenants = await Tenants.find({
            checked:0,
            approved_status: 1,
            isSignOut: 0,
            claimReferenceNumber: { $ne: '' },
            nationalInsuranceNumber: { $ne: '' },
            $or: [
                { status: 0 },
                { status: { $exists: false } },
            ]
        }, {
            firstName: 1,
            lastName: 1,
            nationalInsuranceNumber: 1,
            claimReferenceNumber: 1,
            property: 1,
            dateOfBirth: 1
        }).populate({
            path: 'property',
            select: 'postCode'
        })
            .lean()
            .exec();
        
        if (tenants.length === 0) {
            return;
        }
        
        const bulkUpdates = [];
        for (let TenUser of tenants) {
            try {
                const res = await CheckStatus(TenUser);
                bulkUpdates.push({
                    updateOne: {
                        filter: { _id: TenUser._id },
                        update: { $set: { ...res} }
                    }
                });
            } catch (error) {
                console.log('error in updateData of tenant');
            }
        }

        if (bulkUpdates.length > 0) {
            await Tenants.bulkWrite(bulkUpdates);
        }

    } catch (error) {
        console.log('error in cron job');
    }
};

export default checkTenatStatus