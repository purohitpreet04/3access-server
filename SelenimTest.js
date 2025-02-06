import moment from "moment";
import CheckStatus from "./src/Utils/Sracper.js"
import Tenants from "./src/DB/Schema/TenantsSchema.js";
import { DbConnnection } from "./src/DB/DB.js";
import { handleSendEmail } from "./src/Utils/CronJobFunction.js";



// await CheckStatus(TenUser).then(async (res) => {
//     await Tenants.findByIdAndUpdate(TenUser?._id, { ...res })
//     // console.log('result=>', res);
// }).catch((error) => {
//     console.log(error)
// })

async function updateTenant(TenUser) {
    try {
        const timeoutMs = 30000;
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`CheckStatus timed out after ${timeoutMs}ms`));
            }, timeoutMs);
        });

        const checkStatusPromise = CheckStatus(TenUser);

        const result = await Promise.race([checkStatusPromise, timeoutPromise]);

        if (result instanceof Error) {
            throw result;
        }
        // console.log("result=>", result);

        // await Tenants.findByIdAndUpdate(TenUser?._id, { ...result });
        console.log('Tenant updated successfully');
    } catch (error) {
        console.error('Error updating tenant:', error);
    }
}
// P:\New folder\3access-server\

let TenUser = {
    _id: '679b6f3a30b6d312330b3c77',
    lastName: 'Ehtesham',
    nationalInsuranceNumber: 'PH416711D',
    dateOfBirth: "2002-01-22",
    property: { postCode: 'B11 3BS' },
    claimReferenceNumber: '60716587'
}
updateTenant(TenUser)
// handleSendEmail()
