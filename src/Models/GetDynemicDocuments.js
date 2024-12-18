import axios from "axios";
import { tenatsignImageArray } from "../../test.js";
import Template from "../DB/Schema/TemplateSchema.js"
import Tenants from "../DB/Schema/TenantsSchema.js";
import { generateHtmlforPdf, getDate, replacePlaceholders } from "../Utils/CommonFunctions.js";
import { getPreSignedUrl } from "../Utils/s3Config.js";

export const getDynemicPdf = async (tempid, id, pdf) => {
    let userdata;
    const html = await Template.findOne({ _id: tempid }).lean()
    let pdfTemp

    const data = await Tenants.findById(id)
        .populate({
            path: 'property', // Populate 'property' field
            select: 'address city area eligibleRent postCode rslTypeGroup serviceCharges', // Select specific fields
            populate: {
                path: 'rslTypeGroup', // Populate 'rslTypeGroup' in 'property'
                model: 'rsl', // Assuming 'Users' is the collection name
                select: 'companyname address area city rslLogo', // Select specific fields
            }
        }).populate('addedBy', 'fname lname email role username area visibleTo')
        .lean(); // Use lean to get plain JavaScript objects

    userdata = {
        other_charges_of_tenant: data?.other_charges_of_tenant || '',
        title_before_name: data?.title_before_name || '',
        middleName: data?.middleName || '',
        lastName: data?.lastName || '',
        firstName: data?.firstName || '',
        height: data?.height || '',
        hairColor: data?.hairColor || '',
        shoeSize: data?.shoeSize || '',
        clothingSize: data?.clothingSize || '',
        eyeColor: data?.eyeColor || '',
        skinTone: data?.skinTone || '',
        nationalInsuranceNumber: data?.nationalInsuranceNumber || '',
        dateOfBirth: getDate(data?.dateOfBirth) || '',
        how_often: data?.how_often || '',
        total_amount: data?.total_amount || 0,
        weeklylicencecharge: parseInt(data?.property?.eligibleRent || 0) + parseInt(data?.other_charges_of_tenant || 0),
        claimReferenceNumber: data?.claimReferenceNumber || 'No',
        gender: data?.gender || '',
        tenantContactNumber: data?.tenantContactNumber || '',
        tenantEmail: data?.tenantEmail || '',
        isSignOut: data?.isSignOut || false,
        room: data?.room || '',
        signInDate: getDate(data?.signInDate) || '',
        // confidentialityWaiverForm: data?.confidentialityWaiverForm
        //     ? await getPreSignedUrl(data?.confidentialityWaiverForm)
        //     : null,
        // licenseChargePayments: data?.licenseChargePayments
        //     ? await getPreSignedUrl(data?.licenseChargePayments)
        //     : null,
        // licenseToOccupy: data?.licenseToOccupy
        //     ? await getPreSignedUrl(data?.licenseToOccupy)
        //     : null,
        // staffSignature: data?.staffSignature
        //     ? await getPreSignedUrl(data?.staffSignature)
        //     : null,
        // weeklyServiceCharge: data?.weeklyServiceCharge
        //     ? await getPreSignedUrl(data?.weeklyServiceCharge)
        //     : null,
        // fireEvacuationProcedure: data?.fireEvacuationProcedure
        //     ? await getPreSignedUrl(data?.fireEvacuationProcedure)
        //     : null,
        // authorizationForm: data?.authorizationForm
        //     ? await getPreSignedUrl(data?.authorizationForm)
        //     : null,
        // missingPersonForm: data?.missingPersonForm
        //     ? await getPreSignedUrl(data?.missingPersonForm)
        //     : null,
        // tenantSignature: data?.tenantSignature
        //     ? await getPreSignedUrl(data?.tenantSignature)
        //     : null,
        addedBy: data?.addedBy || null,
        rslname: data?.property?.rslTypeGroup?.companyname || '',
        rslAddress: data?.property?.rslTypeGroup?.address || '',
        rsLArea: data?.property?.rslTypeGroup?.area || '',
        rslCity: data?.property?.rslTypeGroup?.city || '',
        pro_address: data?.property?.address || '',
        pro_city: data?.property?.city || '',
        pro_area: data?.property?.area || '',
        pro_eligibleRent: data?.property?.eligibleRent || 0,
        pro_postCode: data?.property?.postCode || '',
        pro_serviceCharges: data?.property?.serviceCharges || 0
    };

    try {
        for (let { key } of tenatsignImageArray) {
            userdata[key] = data[key]
        }
        let logo
        if (data?.property?.rslTypeGroup?.rslLogo !== '') {
            logo = await getPreSignedUrl(data?.property?.rslTypeGroup?.rslLogo)
            // let logo = ''
            if (logo && /^https?:\/\//.test(logo)) {
                try {
                    const response = await axios.get(logo, { responseType: 'arraybuffer' });
                    const base64Image = Buffer.from(response.data).toString('base64');
                    const fileType = response.headers['content-type'];
                    logo = `data:${fileType};base64,${base64Image}`;
                } catch (imageError) {
                    console.error('Error fetching image:', imageError.message);
                    logo = ''; // Fallback to empty string if image fetch fails
                }
            }
        }
        if(!pdf){
        pdfTemp = await replacePlaceholders(html?.body, userdata)
        let body = { html: pdfTemp, logo }
        return { html: addBorderAndSpacingToHTML(body.html, body.logo), logo }
        }else{
           let pdfhtmlTemp = await generateHtmlforPdf(html?.body, userdata)
           return { html: pdfhtmlTemp, logo }
        }
        
    } catch (error) {
        console.log(error)
    }

}
const addBorderAndSpacingToHTML = (html, logoURL) => {
    const styledContent = `
    <div style="border: 2px solid #000; padding: 20px; margin: 20px auto; max-width: 800px; line-height: 1.6;">
     <img src="${logoURL}" alt="Logo" style="height: 40px;"></img>
    <div style=" height: 60px; border-top: 1px solid #ddd; text-align: left; padding: 10px;">
        </div>
            ${html}
        </div>
    `;

    // If <body> exists, wrap the content inside the styled container
    // if (html.includes('<body>')) {
    //     return html.replace(
    //         '<body>',
    //         `<body>${styledContent}`
    //     );
    // }

    // If no <body>, wrap the entire content in the styled container
    return styledContent;
};