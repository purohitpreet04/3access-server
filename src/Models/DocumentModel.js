import { config } from "dotenv";
import DucumentTamplate from '../Utils/Document.js'
import Tenants from "../DB/Schema/TenantsSchema.js";
import { getPreSignedUrl } from "../Utils/s3Config.js";
config()
const beckend = process.env.BECK_END;



export const getDocumentModule = async (type, id) => {
    try {

        let userdata
        // if (['personal_details'].includes(type)) {
        //     userdata = await Tenants.findById(id).select('address area city dateOfBirth firstName lastName nationalInsuranceNumber tenantEmail tenantContactNumber middleName how_often total_amount')
        // }
        if (['confidentiality_wavier_form', 'license_to_occupy', 'license_charge_payments', 'your_weekly_service_charge', "personal_details", "authorization_form", "fire_evacuation_procedure_for_all_residents", "missing_person_form", "tenant_photographic_id_consent_form"].includes(type)) {
            const data = await Tenants.findById(id)
                .populate({
                    path: 'property', // Populate 'property' field
                    select: 'address city area eligibleRent postCode rslTypeGroup serviceCharges', // Select specific fields
                    populate: {
                        path: 'rslTypeGroup', // Populate 'rslTypeGroup' in 'property'
                        model: 'User', // Assuming 'Users' is the collection name
                        select: 'companyname address area city', // Select specific fields
                    }
                }).populate('addedBy', 'fname lname email role username area visibleTo')
                .lean(); // Use lean to get plain JavaScript objects
            // console.log(data)
            userdata = {
                other_charges_of_tenant: data?.other_charges_of_tenant || '',
                title_before_name: data?.title_before_name || '',
                middleName: data?.middleName || '',
                lastName: data?.lastName,
                firstName: data?.firstName,
                height: data?.height,
                hairColor: data?.hairColor,
                shoeSize: data?.shoeSize,
                clothingSize: data?.clothingSize,
                eyeColor: data?.eyeColor,
                skinTone: data?.skinTone,
                nationalInsuranceNumber: data?.nationalInsuranceNumber,
                dateOfBirth: data?.dateOfBirth,
                how_often: data?.how_often,
                total_amount: data?.total_amount,
                weeklylicencecharge: parseInt(data?.property.eligibleRent || 0) + parseInt(data?.other_charges_of_tenant || 0),
                claimReferenceNumber: data?.claimReferenceNumber || 'No',
                gender: data?.gender,
                tenantContactNumber: data?.tenantContactNumber,
                tenantEmail: data?.tenantEmail,
                isSignOut: data?.isSignOut,
                room: data?.room,
                signInDate: data?.signInDate,
                confidentialityWaiverForm: await getPreSignedUrl(data?.confidentialityWaiverForm),
                licenseChargePayments: await getPreSignedUrl(data?.licenseChargePayments),
                licenseToOccupy: await getPreSignedUrl(data?.licenseToOccupy),
                staffSignature: await getPreSignedUrl(data?.staffSignature),
                weeklyServiceCharge: await getPreSignedUrl(data?.weeklyServiceCharge),
                fireEvacuationProcedure: await getPreSignedUrl(data?.fireEvacuationProcedure),
                authorizationForm: await getPreSignedUrl(data?.authorizationForm),
                missingPersonForm: await getPreSignedUrl(data?.missingPersonForm),
                tenantSignature: await getPreSignedUrl(data?.tenantSignature),
                addedBy: data?.addedBy ? data?.addedBy : null,
                rslDetails: data?.property?.rslTypeGroup
                    ? {
                        rslname: data?.property.rslTypeGroup.companyname,
                        address: data?.property.rslTypeGroup.address,
                        area: data?.property.rslTypeGroup.area,
                        city: data?.property.rslTypeGroup.city,

                    }
                    : null,
                propertyDetails: data?.property
                    ? {
                        address: data?.property.address,
                        city: data?.property.city,
                        area: data?.property.area,
                        eligibleRent: data?.property.eligibleRent,
                        postCode: data?.property.postCode,
                        serviceCharges: data?.property?.serviceCharges
                    }
                    : null,


            };
        }

        const htmlContent = await DucumentTamplate(type, userdata)
        return htmlContent;
    } catch (error) {
        console.log('error in generate html template')
        
    }
}