import mongoose from "mongoose";
import { EmailLog } from "../DB/Schema/EmailLogSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import Tenants from "../DB/Schema/TenantsSchema.js";
import user from "../DB/Schema/userSchema.js";
import { chunkArray, generateExcelFile, writeLog } from "./CommonFunctions.js";
import sendMail from "./email.service.js";
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
            checked: 0,
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
        }).limit()
            .lean()
            .sort({ createdAt: -1 })
            .exec();

        if (tenants.length === 0) {
            return;
        }
        let error = {}
        let splitarray = chunkArray(tenants, 3)
        const bulkUpdates = [];
        for (let Chunk of splitarray) {
            for (let TenUser of Chunk) {
                try {
                    const res = await CheckStatus(TenUser);
                    let date = new Date()
                    if (res?.error) {
                        const logMessage = `[${date.toISOString()}] ${TenUser.firstName || ''} ${TenUser?.middleName || ''} ${TenUser.lastName || ''} | NINO: ${TenUser.nationalInsuranceNumber || ''} | Claim Ref: ${TenUser.claimReferenceNumber || "No"} | Error: ${res.error}`;
                        writeLog(logMessage);
                    }
                    console.log('ischecked', TenUser._id);
                    bulkUpdates.push({
                        updateOne: {
                            filter: { _id: TenUser._id },
                            update: { $set: { ...res } }
                        }
                    });

                } catch (error) {
                    console.log('error in updateData of tenant');
                }
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




export const handleSendEmail = async () => {
    try {

        console.log('bhbbjbhjbb ');

        let agents = await user.find({ role: 'agent', status: 1, sendEmail: 1 }).lean().exec();
        if (agents.length === 0) {
            return;
        }
        agents.map(async (agent) => {
            let tenants = await handleNotActiveTenants(agent._id);
            if (tenants.length === 0) {
                return;
            }
            let replaceKeys = {
                createdAt: 'Created At',
                addedBy: 'Added By',
                rslTypeGroup: "Rsl",
                propertyAddress: 'Property Address',
                area: "Area Name",
                city: "City",
                postCode: "Postcode",
                bedrooms: "Number of Bedrooms in Property",
                basicRent: "Basic Rent",
                serviceCharges: "Service Charges",
                eligibleRent: "eligible Rent",
                ineligibleCharge: "weekly eligible Charge",
                sharedWithOther: "Bedroom sharedWithOther",
                firstName: "First Name",
                middleName: "Middle Name",
                lastName: "Surname",
                room: "Room",
                dateOfBirth: "Date of Birth",
                nationalInsuranceNumber: "NINO",
                claimReferenceNumber: "Claim Reference No",
                signInDate: "Sign In Date"
            }


            let buffer = await generateExcelFile(tenants, replaceKeys)

            let attachment = {
                filename: 'Not Active Tenants.xlsx',
                content: buffer,
                contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            };

            const mailOptions = {
                from: process.env.EMAIL,
                to: agent.coruspondingEmail,
                subject: 'Not Active Tenants',
                attachments: [{ ...attachment }],
            };

            let info = await sendMail(mailOptions);
            const log = new EmailLog({
                userId: agent._id,
                subject: mailOptions?.subject,
                body: 'Email Sent',
                attachments: mailOptions?.attachments.map(attachment => attachment.filename).join(', '),
                emailTo: mailOptions?.to,
                emailCC: '',
            });
            await log.save();
        })

    } catch (error) {
        console.log('error', error);

    }

}


const handleNotActiveTenants = async (_id) => {
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

export const testTenants = async () => {

    try {
        // '679392a8ec423baaaf062792'
        const tenants = await Tenants.find({
            addedBy: new mongoose.Types.ObjectId('679392a8ec423baaaf062792'),
            checked: 0,
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
        }).limit(10)
            .lean()
            .exec()


        if (tenants.length === 0) {
            return;
        }
        let error = {}
        let splitarray = chunkArray(tenants, 3)

        const bulkUpdates = [];
        for (let Chunk of splitarray) {
            for (let TenUser of Chunk) {
                try {
                    const res = await CheckStatus(TenUser);
                    let date = new Date()
                    if (res?.error) {
                        const logMessage = `[${date.toISOString()}] ${TenUser.firstName || ''} ${TenUser?.middleName || ''} ${TenUser.lastName || ''} | NINO: ${TenUser.nationalInsuranceNumber || ''} | Claim Ref: ${TenUser.claimReferenceNumber || "No"} | Error: ${res.error}`;
                        writeLog(logMessage);
                    }

                    bulkUpdates.push({
                        updateOne: {
                            filter: { _id: TenUser._id },
                            update: { $set: { ...res } }
                        }
                    });

                } catch (error) {
                    console.log('error in updateData of tenant');
                }
            }
        }
        if (bulkUpdates.length > 0) {
            await Tenants.bulkWrite(bulkUpdates);
        }

    } catch (error) {
        console.log('error in cron job');
    }
}
