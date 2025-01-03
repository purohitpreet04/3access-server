import axios from "axios";
import { riskCategories, tenatsignImageArray } from "../../test.js";
import Template from "../DB/Schema/TemplateSchema.js"
import user from "../DB/Schema/userSchema.js"
import Staff from "../DB/Schema/StaffSchema.js"
import Tenants from "../DB/Schema/TenantsSchema.js";
import { generateHtmlforPdf, getDate, replacePlaceholders } from "../Utils/CommonFunctions.js";
import { getPreSignedUrl } from "../Utils/s3Config.js";

export const getDynemicPdf = async (tempid, id, pdf, otherData) => {


    let userdata;
    const html = await Template.findOne({ _id: tempid }).lean()
    let pdfTemp

    const data = await Tenants.findById(id)
        .populate({
            path: 'property',
            select: 'address city area eligibleRent postCode rslTypeGroup serviceCharges ineligibleCharge bedrooms basicRent',
            populate: {
                path: 'rslTypeGroup',
                model: 'rsl',
                select: 'companyname address area city rslLogo pincode addedBy',
            }
        })
        .populate('addedBy', 'fname lname email role username')
        .populate({
            path: 'signOutper.byWhom',
            select: 'fname lname email role username',
        })
        .lean();


    let maDetails;
    if (['agent'].includes(data.addedBy?.role)) {
        maDetails = `${data.addedBy?.fname} ${data.addedBy?.lname} (${data.addedBy?.role})`
    } else {
        let staff = Staff.find({ _id: data.addedBy?._id }).populate('addedBy', 'fname lname email role').lean()
        maDetails = `${staff.addedBy?.fname} ${staff.addedBy?.lname} (${staff.addedBy?.role})`
    }

    userdata = {
        ...otherData,
        maname:maDetails,
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
        claimReferenceNumber: data?.claimReferenceNumber || 'No',
        gender: data?.gender || '',
        tenantContactNumber: data?.tenantContactNumber || '',
        tenantEmail: data?.tenantEmail || '',
        build: data?.build || '',
        isSignOut: data?.isSignOut || false,
        room: data?.room || '',
        signOutBy: `${data?.signOutper?.byWhom?.fname} ${data?.signOutper?.byWhom?.lname} (${data?.signOutper?.byWhom.role})` || '',
        signInDate: getDate(data?.signInDate) || '',
        signOutDate: getDate(data?.signOutDate) || '',
        addedBy: data?.addedBy || null,
        vehiclesdetails: data?.vehiclesdetails || 'No vehicles details provided',
        distinguishingMarks: data?.distinguishingMarks || 'No distinguishing marks provided',
        supportPersonName: `${data?.addedBy?.fname} ${data?.addedBy?.lname}` || '',
        weeklylicencecharge: parseInt(data?.property?.eligibleRent || 0) + parseInt(data?.other_charges_of_tenant || 0),
        nextOfKinName: data?.nextOfKinName || 'No next of kin provided',
        nextOfKinAddress: data?.nextOfKinAddress || 'No next of kin provided',
        nextOfKinContactNo: data?.nextOfKinContactNo || 'No next of kin provided',
        nextOfKinRelation: data?.nextOfKinRelation || 'No next of kin provided',
        nextOfKinOtherContact: data?.nextOfKinOtherContact || 'No next of kin provided',
        nextOfKinVisitDetails: data?.nextOfKinVisitDetails || 'No next of kin provided',
        rslname: data?.property?.rslTypeGroup?.companyname || '',
        rslAddress: data?.property?.rslTypeGroup?.address || '',
        rsLArea: data?.property?.rslTypeGroup?.area || '',
        rslCity: data?.property?.rslTypeGroup?.city || '',
        rslpincode: data?.property?.rslTypeGroup?.pincode || '',
        pro_address: data?.property?.address || '',
        pro_city: data?.property?.city || '',
        pro_area: data?.property?.area || '',
        pro_eligibleRent: data?.property?.eligibleRent || 0,
        pro_postCode: data?.property?.postCode || '',
        pro_serviceCharges: data?.property?.serviceCharges || 0,
        ineligibleCharge: data?.property?.ineligibleCharge || 0,
        pro_bedrooms: data?.property?.bedrooms || 0,
        two_weeksserviceCharge: data?.property?.serviceCharges * 2 || 0,
        basicRent: data?.property?.basicRent || 0,
        isPresent:data?.isPresent
    };

    try {

        let riskCategoriesarray = []
        riskCategories.forEach(category => {
            if (data?.assesment[category?.name] === true) {
                riskCategoriesarray.push(category?.label)
            }
        })
        userdata['risk_Identified'] = riskCategoriesarray.join(', ')
        Object.keys(userdata).forEach(key => {
            if (typeof userdata[key] === 'boolean') {
                userdata[key] = userdata[key] ? 'Yes' : 'No'
            }
            if (typeof userdata[key] === 'string') {
                userdata[key] = userdata[key] || ''
            }
            userdata[key] = userdata[key]
        })
        if (data?.assesment) {
            Object.keys(data?.assesment).forEach(key => {
                if (typeof data?.assesment[key] === 'boolean') {
                    userdata[key] = data?.assesment[key] ? 'Yes' : 'No'
                } else {
                    userdata[key] = data?.assesment[key]
                }
            })
        }

        for (let { key } of tenatsignImageArray) {
            userdata[key] = data[key]
        }
        if (data[html?.key]) {
            userdata['tenantSignature'] = data[html?.key]
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
        if (!pdf) {
            pdfTemp = await replacePlaceholders(html?.body, userdata)
            let body = { html: pdfTemp, logo }
            return { html: addBorderAndSpacingToHTML(body.html, body.logo), logo }
        } else {
            // pdfTemp = await replacePlaceholders(html?.body, userdata)
            // let body = { html: pdfTemp, logo }
            // return { html: addBorderAndSpacingToHTML(body.html, body.logo), logo }
            // return { html: addBorderAndSpacingToHTML(body.html, body.logo), logo }
            let pdfhtmlTemp = await generateHtmlforPdf(html?.body, userdata)
            return { html: pdfhtmlTemp, logo, name: html?.name }
        }

    } catch (error) {

        console.log('error in getDynemicPdf')
    }

}
const addBorderAndSpacingToHTML = (html, logoURL) => {
    const styledContent = `
    <div style="border: 2px solid #000; padding: 10px; margin: 10px auto; max-width: 1000px; line-height: 1.6;">
     <img src="${logoURL}" alt="Logo" style="height: 50px; width: 50px; object-fit: contain;"></img>
        <div style=" height: 60px; border-top: 1px solid #ddd; text-align: left; padding: 10px;">
        </div>
            ${html}
        </div>
    `;
    return styledContent;
};