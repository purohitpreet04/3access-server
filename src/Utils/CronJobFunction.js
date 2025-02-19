import mongoose from "mongoose";
import { EmailLog } from "../DB/Schema/EmailLogSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import Tenants from "../DB/Schema/TenantsSchema.js";
import user from "../DB/Schema/userSchema.js";
import { chunkArray, generateExcelFile, writeLog } from "./CommonFunctions.js";
import sendMail from "./email.service.js";
import CheckStatus from "./Sracper.js";
import fs from 'fs';
import { handleNotActiveTenants } from "../Models/TenantModal.js";

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
            // checked: 0,
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
        let bulkUpdates = [];
        for (let Chunk of splitarray) {
            for (let TenUser of Chunk) {
                const res = await CheckStatus(TenUser);
                let date = new Date();
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
                propertyAddress: 'Property Address',
                area: "Area Name",
                city: "City",
                postCode: "Postcode",
                room: "Room",
                firstName: "First Name",
                middleName: "Middle Name",
                lastName: "Surname",
                dateOfBirth: "Date of Birth",
                nationalInsuranceNumber: "NINO",
                claimReferenceNumber: "Claim Reference No",
                signInDate: "Sign In Date",
                recordStatus: 'Action'
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




export const testTenants = async () => {

    try {
        // '679392a8ec423baaaf062792'
        const tenants = await Tenants.find({
            addedBy: new mongoose.Types.ObjectId('676147eac6c01729d8057817'),
            checked: 0,
            approved_status: 1,
            isDeleted: 0,
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
        }).limit(5)
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
                    console.log('error in updateData of tenant', error.message);
                }
            }
        }
        if (bulkUpdates.length > 0) {
            await Tenants.bulkWrite(bulkUpdates);
            console.log('updated', bulkUpdates)
        }

    } catch (error) {
        console.log('error in cron job');
    }
}
