import moment from "moment";
import CheckStatus from "./src/Utils/Sracper.js"
import Tenants from "./src/DB/Schema/TenantsSchema.js";
import { DbConnnection } from "./src/DB/DB.js";



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
        console.log("result=>", result);

        // await Tenants.findByIdAndUpdate(TenUser?._id, { ...result });
        console.log('Tenant updated successfully');
    } catch (error) {
        console.error('Error updating tenant:', error);
    }
}

let TenUser = {
    _id: '6788f72bc45ba131e9c144d7',
    lastName: 'ali',
    nationalInsuranceNumber: 'PX880556A',
    dateOfBirth: "1988-03-28T00:00:00.000+00:00",
    property: { postCode: 'B11 3BS' },
    claimReferenceNumber: '60384800'
}
updateTenant(TenUser)
