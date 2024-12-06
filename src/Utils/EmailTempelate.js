import { getDate } from "./CommonFunctions.js"

const EmailTempelates = (type, user) => {
    let templates = {
        new_tanant: `<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="font-weight: bold;">New Signup Notification</td>
    </tr>
    <tr>
        <td>Hi,</td>
    </tr>
    <tr>
        <td>Here's a new signup:</td>
    </tr>
    <tr>
        <td><strong>Address:</strong> ${user?.address || ''} ${user?.area || ''}, ${user?.city || ''}, ${user?.postcode || ''}</td>
    </tr>
    <tr>
        <td><strong>Tenant Name:</strong>${user?.title_before_name} ${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}</td>
    </tr>
    <tr>
        <td><strong>Date of Birth:</strong> ${getDate(user?.dateOfBirth)}</td>
    </tr>
    <tr>
        <td><strong>National Insurance Number:</strong> ${user?.nationalInsuranceNumber}</td>
    </tr>
    <tr>
        <td><strong>Move-In Date:</strong> ${getDate(user?.dateOfBirth)}</td>
    </tr>
    <tr>
        <td>Regards,</td>
    </tr>
    <tr>
        <td style="font-size: small; color: gray;">All rights reserved.</td>
    </tr>
</table>`
    }

    return templates[type]
}

export default EmailTempelates