import Tenants from "../DB/Schema/TenantsSchema.js"
import CheckStatus from "./Sracper.js"

export const checkTenatStatus = async () => {
    try {

        const tenants = await Tenants.find({
            isSignOut: 0,
            claimReferenceNumber: { $ne: '' },
            nationalInsuranceNumber: { $ne: '' },
            status: { $exists: false }
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
            return
        }

        for (let TenUser of tenants) {
            await CheckStatus(TenUser).then(async (res) => {
                await Tenants.findByIdAndUpdate(TenUser?._id, { status: res })
                
            }).catch((error) => {
                console.log(error)
            })
        }

    } catch (error) {
        // console.log(error)
        console.log('error in cron job')
    }
}

export default checkTenatStatus