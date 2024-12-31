import { parentPort } from "worker_threads";
import { EmailLog } from "../DB/Schema/EmailLogSchema.js";
import Template from "../DB/Schema/TemplateSchema.js";
import { GeneratePdf } from "../Models/GeneratePdfModel.js";
import sendMail from "../Utils/email.service.js";
import EmailTempelates from "../Utils/EmailTempelate.js";
import mongoose from "mongoose";
import { DbConnnection } from "../DB/DB.js";
import  Tenants from "../DB/Schema/TenantsSchema.js";
import { getDate } from "../Utils/CommonFunctions.js";
 
DbConnnection().then(() => {
    parentPort.on('message', async (stringyfiedData) => {
        const data = JSON.parse(stringyfiedData);
        const { userData, newTenant, rentproperty, pdfTemplets } = data;

        try {

            let attachmentsArray = pdfTemplets.map(async (pdfTemplet) => {
                const pdfBuffer = await GeneratePdf(pdfTemplet?._id, newTenant?._id);
                return {
                    filename: pdfTemplet?.name,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                }
            })

            await Promise.all(attachmentsArray);

            const mailObj = {
                replyTo: userData?.emailto,
                to: userData?.emailto,
                bcc: userData?.emailcc,
                subject: `New Signup, ${rentproperty?.address}, ${rentproperty?.area}, ${rentproperty?.city}, ${rentproperty?.postCode}, ${newTenant?.firstName || ''} ${newTenant?.middleName || ''} ${newTenant?.lastName || ''}, ${getDate(newTenant?.dateOfBirth)}, ${newTenant?.nationalInsuranceNumber}, ${getDate(newTenant?.dateOfBirth)}, Housing Benefit Form`,
                html: EmailTempelates("new_tanant", newTenant),
                attachments: [...attachmentsArray],
            };

            await sendMail(mailObj);

            const log = new EmailLog({
                userId: newTenant?.addedBy,
                subject: mailObj.subject,
                body: mailObj.html,
                attachments: mailObj.attachments[0].filename,
                emailTo: mailObj.to,
                emailCC: mailObj.bcc,
            });
            await log.save();

            parentPort.postMessage({ success: true });
        } catch (error) {
            parentPort.postMessage({
                success: false,
                error: error.message
            });
        }
    })
})