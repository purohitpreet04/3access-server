import { getDate } from "./CommonFunctions.js";

const DocumentTemplate = (type, user) => {

    // console.log("user", user)
    const templates = {
        supportchecklist: `
        <div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;">
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <strong>
            <span style='font-size:19px;line-height:107%;font-family:"Arial",sans-serif;'>SUPPORT CHECKLIST</span>
        </strong>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>&nbsp;</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <strong>
            <span style='font-family:"Arial",sans-serif;'>ON ARRIVAL</span>
        </strong>
        <span style='font-family:"Arial",sans-serif;'>&nbsp;- When you meet the tenant the first thing you need to complete with the tenant is their Housing Benefit Application:</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>Housing Benefit Form is completed online or Change of Circumstance (If moved from a property that they &lsquo;were claiming housing benefit from previously). We make note of the reference provided an input it onto the property database on the shared Gmail Drive.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>Once this is completed we complete the following paperwork in the sign-up pack:</span>
    </p>
    <ol style="list-style-type: decimal;">
        <li>
            <span style='font-family:"Arial",sans-serif; font-size:13px;'>Personal Details</span>
        </li>
        <li>
            <span style='font-family:"Arial",sans-serif; font-size:13px;'>Missing Persons Form</span>
        </li>
        <li>
            <span style='font-family:"Arial",sans-serif; font-size:13px;'>Support Agreement (explain this to the resident)</span>
        </li>
        <li>
            <span style='font-family:"Arial",sans-serif; font-size:13px;'>Initial Assessment/Needs Assessment (completed with service user ~ this is an opportunity to explain &lsquo;our services further and find out more information about them)</span>
        </li>
        <li>
            <span style='font-family:"Arial",sans-serif; font-size:13px;'>Service charge letter</span>
        </li>
        <li>
            <span style='font-family:"Arial",sans-serif; font-size:13px;'>Confidentiality Form</span>
        </li>
    </ol>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>An appointment will them be made for the following week. Please allow enough time for your as a support worker to complete Risk Assessment and Support Plan before the next appointment.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>Al the above information will be briefly recorded on a daily case note to capture all the information that was discussed on this visit.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <strong>
            <span style='font-family:"Arial",sans-serif;'>WITHIN 48 HOURS</span>
        </strong>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>The support worker is responsible for completing the risk assessment, however this assessment is not shared with the resident itis an internal document about the resident that is shared with all staff members.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>The risk assessment is completed using the referral and Initial/Needs assessment.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>This will then need to be emailed to your senior for approval.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>The support worker is responsible for completing the support plan using the above information.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>This document and the Risk Assessment are then reviewed quarterly unless there is an outstanding issue that then prompts the risk assessment to be reviewed immediately or more needs occur for the resident and the support plan is then amended.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>An appointment is then made within 1 week of the Service Users singing up for the property to go through and explain the support plan. The resident will need to sign the support plan to state they are happy with the goals that have been set.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>All interaction between support worker and resident is recorded on daily case notes unless itis an allocated Key Work Session. If it is an allocated key work session this will be recorded on Key Work Session Notes. This practice will continue throughout their entire length of their support.</span>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <strong>
            <span style='font-family:"Arial",sans-serif;'>All interaction with any resident needs to be recorded.</span>
        </strong>
    </p>
    <p style='margin-top:0in;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:107%;font-size:13px;font-family:"Calibri",sans-serif;'>
        <span style='font-family:"Arial",sans-serif;'>&nbsp;</span>
    </p>
</div>
`,
        personal_details: `<div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;"><div style="font-family:calibri; text-align:center;">
    <p style="line-height:108%; font-size:14pt"><span style=" font-weight:bold">PERSONAL DETAILS</span></p>
    <table cellspacing="0" cellpadding="0" class="TableGrid"
        style="margin:auto; -aw-border-insideh:0.5pt single #000000; -aw-border-insidev:0.5pt single #000000; border-collapse:collapse;">
        <tr>
            <td colspan="4"
                style="width:440pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Financial Information</span></p>
            </td>
        </tr>
        <tr>
            <td colspan="2"
                style="width:139.45pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>Type of Benefit:</span></p>
            </td>
            <td
                style="width:139.45pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>How often paid:</span></p>
            </td>
            <td
                style="width:139.5pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>Amount:</span></p>
            </td>
        </tr>
        <tr style="height:35.3pt">
            <td colspan="2"
                style="width:139.45pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span style="-aw-import:ignore">&#xa0;</span>Universal Credit</p>
            </td>
            <td
                style="width:139.45pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span style="-aw-import:ignore">&#xa0;</span>${user?.how_often}</p>
            </td>
            <td
                style="width:139.5pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>${user?.total_amount}</span></p>
            </td>
        </tr>
        <tr style="height:33.55pt">
            <td
                style="width:116.55pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>Next of kin/ Relationship:</span></p>
            </td>
            <td colspan="3"
                style="width:312.65pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span style="-aw-import:ignore">&#xa0;</span>No</p>
            </td>
        </tr>
        <tr style="height:19.45pt">
            <td
                style="width:116.55pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>Name:</span></p>
            </td>
            <td colspan="3"
                style="width:312.65pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span style="-aw-import:ignore">&#xa0;</span>No</p>
            </td>
        </tr>
        <tr style="height:28.25pt">
            <td
                style="width:116.55pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>Address:</span></p>
            </td>
            <td colspan="3"
                style="width:312.65pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span style="-aw-import:ignore">&#xa0;</span>No</p>
            </td>
        </tr>
        <tr style="height:21.05pt">
            <td
                style="width:116.55pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>Contact Number:</span></p>
            </td>
            <td colspan="3"
                style="width:312.65pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span style="-aw-import:ignore">&#xa0;</span>No</p>
            </td>
        </tr>
        <tr style="height:20.65pt">
            <td
                style="width:116.55pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>Doctor:</span></p>
            </td>
            <td colspan="3"
                style="width:312.65pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span style="-aw-import:ignore">&#xa0;</span>No</p>
            </td>
        </tr>
        <tr style="height:21.6pt">
            <td
                style="width:116.55pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span>Probation Officer:</span></p>
            </td>
            <td colspan="3"
                style="width:312.65pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                <p class="NoSpacing" style="font-size:12pt"><span style="-aw-import:ignore">&#xa0;</span>No</p>
            </td>
        </tr>
        <tr style="height:0pt">
            <td style="width:127.35pt"></td>
            <td style="width:22.9pt"></td>
            <td style="width:150.25pt"></td>
            <td style="width:150.3pt"></td>
        </tr>
    </table>
    <p><span style="-aw-import:ignore">&#xa0;</span></p>
    <table cellspacing="0" cellpadding="0" class="GridTable6Colorful"
        style="margin:auto; -aw-border-insideh:0.5pt single #000000; -aw-border-insidev:0.5pt single #000000; border-collapse:collapse;">
        <tr style="height:19.95pt">
            <td
                style="width:114.95pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Mr/Mrs/Ms/Miss:</span></p>
            </td>
            <td
                style="width:314.25pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p>Mr</p>
            </td>
        </tr>
        <tr style="height:20.5pt">
            <td
                style="width:114.95pt; border-top-style:solid; border-top-width:0.75pt; border-right:0.75pt solid #000000; border-left:0.75pt solid #000000; border-bottom:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Full Name:</span></p>
            </td>
            <td
                style="width:314.25pt; border-top-style:solid; border-top-width:0.75pt; border-right:0.75pt solid #000000; border-left:0.75pt solid #000000; border-bottom:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}</p>
            </td>
        </tr>
        <tr style="height:19.3pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Date of birth:</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>${getDate(user?.dateOfBirth)}</p>
            </td>
        </tr>
        <tr style="height:19.5pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>National Insurance no:</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>${user?.nationalInsuranceNumber}</p>
            </td>
        </tr>
        <tr style="height:23.5pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Nationality:</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span></p>
            </td>
        </tr>

        
        <tr style="height:23.5pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Previous Address:</span></p>
                
                
                
                
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>No</p>
            </td>
        </tr>
        <tr style="height:39.9pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>New Address:</span></p>
                
                
                
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>${user?.rslDetails.address}, ${user?.rslDetails.area}, ${user?.rslDetails.city} </p>
            </td>
        </tr>
        <tr style="height:24.5pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Room Number:</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>3</p>
            </td>
        </tr>
        <tr style="height:24.5pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Date resident moved into new accommodation:</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>12-08-2024</p>
            </td>
        </tr>
        <tr style="height:27.7pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Mobile phone number:</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>${user?.tenantContactNumber}</p>
            </td>
        </tr>
        <tr style="height:35.1pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Languages Spoken and Written:</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span style="-aw-import:ignore">&#xa0;</span>No</p>
            </td>
        </tr>
        <tr style="height:35.1pt">
            <td
                style="width:114.95pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#d9d9d9; -aw-border:0.5pt single">
                <p style="margin-bottom:0pt"><span>Details of any potential risk:</span></p>
            </td>
            <td
                style="width:314.25pt; border:0.75pt solid #000000; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border:0.5pt single">
               <p>Fallen out with siblings over money owed.
Personal hygiene issues</p>
            </td>
        </tr>
    </table>
    <p><span style="-aw-import:ignore">&#xa0;</span></p>
</div></div>`,
        confidentiality_wavier_form: `<div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;">
    <div class="" style="font-family:calibri;">
        <h2>
            <strong>CONFIDENTIALITY WAVIER FORM</strong>
        </h2>
        <p style="text-align: justify;">This form is to enable us to collect information on your behalf. It will enable us to support you more
        effectively with regards to your jointly agreed Support.</p>
        <p style="text-align: justify;">In order to enhance the support, we can do for you on your behalf there may be times when we need to gather or
        pass on information from/to other agencies, for example third party support agencies, social services, doctors
        or other housing providers. Signing this form will allow such processes to happen quickly and effectively. This
        form gives us the authority to gather or pass on relevant information whilst we are working on your case without
        the necessity of you being required to be present. However, you will always be informed of what action we are
        seeking to take on your behalf and the exact type of information we will need to request or disclose.</p>
        <p style="text-align: justify;">It would, therefore, assist our support of you if you could sign the declaration below as confirmation of your
        agreement for us to have your authority to act on your behalf in respect of your support.</p>
        <p style="text-align: justify;">I understand that I may withdraw my consent to share information at any time.</p>
        <p style="text-align: justify;">I understand that I have the right to restrict what information may be shared and with whom.</p>
        <p style="text-align: justify;">
            <em>&ldquo;I authorise Ash-Shahada Housing Association to disclose or gather confidential information about
            myself from/to outside organisations (in my absence) in regard to the implementation of my jointly agreed
            Support. They will do this for my benefit in the process of assisting me to become more independent."</em>
        </p>
        <p>
            <strong>
                <em>Print name:</em>
                &nbsp;&nbsp;${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}
            </strong>
        </p>
        <p>
            <strong>
                <em>&nbsp;</em>
            </strong>
        </p>
        <p>
            <strong>
                <em>Date:&nbsp;&nbsp;&nbsp;03-07-2024
            </strong>
        </p>
        <p>
            <strong>
                <em>Signature (resident):
            </strong>
        </p>
        <img loading="lazy" style="width: 150px;" src="${user?.confidentialityWaiverForm}"/>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>
            <strong>
                <em>Signature (on behalf of ${user?.rslDetails?.rslname || ''}):</em>
            </strong>
        </p>
        <img loading="lazy" style="width: 230px;" src="${user?.staffSignature}"/>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>
            <strong>
                <em>Name:&nbsp;&nbsp;&nbsp;${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}
            </strong>
        </p>
        <p>
            <strong>
                <em>Date:&nbsp;&nbsp;&nbsp;${getDate(user?.signInDate)}
            </strong>
        </p>
        <p>&nbsp;</p>
    </div>
</div>
`,
        license_to_occupy: `<div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;">
    <p>
        <strong>&nbsp;</strong>
    </p>
    <p>
        <strong>LICENCE TO OCCUPY</strong>
    </p>
    <p>
        <strong>&nbsp;</strong>
    </p>
    <p>
        THIS LICENCE, effective from the date &nbsp;<u>03-07-2024</u>
        &nbsp;is between the Licensor and Licensee (as referred to and defined below) and shall form the basis of the understanding between the parties entering this arrangement. The address below constitutes Supported Accommodation.
    </p>
    <p>For the avoidance of doubt, this licence is for the lifetime of occupancy whilst housed by Ash-Shahada Housing Association and does not confer exclusive possession rights to the Licensee to occupy the Property (as defined below).</p>
    <p>
        <strong>Licensor:</strong>
    </p>
    <p>ASH-SHAHADA HOUSING ASSOCIATION LIMITED a company registered in England Wales with company number IP25805R and whose registered office is 43/45 Coldharbour Ln, Camberwell, London SE5 9NR and the Licensor is a registered provider of social housing regulated by the Homes and Communities Agency.</p>
    <p>
        <strong>Licensee:</strong>
    </p>
    <p>
        <em>
            Name<strong>: </strong>
            ${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}
        </em>
    </p>
    <p>
        <em>Room Number: ${user?.room}</em>
    </p>
    <p>
        <em>Date of Birth: ${getDate(user?.dateOfBirth)}</em>
    </p>
    <p>
        <em>National Insurance Number: ${user?.nationalInsuranceNumber}</em>
    </p>
    <p>
        <em>Property Address: ${user?.propertyDetails?.address}, ${user?.propertyDetails?.area}, ${user?.propertyDetails?.city}</em>
    </p>
    <p>
        <em>Postcode: ${user?.propertyDetails?.postCode}</em>
    </p>
    <p>&nbsp;</p>
    <p>
        <em>
            Signature: <img loading="lazy" style="width: 150px;" src="${user?.licenseToOccupy}"/>
        </em>
    </p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
</div>
`,
        license_charge_payments: `
        <div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;">
    <body style="line-height:108%; font-family:Calibri; ">
        <div>
            <h2 style="font-weight:boldmargin-top:0pt; margin-bottom:8pt; text-align:justify">Licence Charge
                payments:</h2>
            <br>
            <table cellspacing="0" cellpadding="0" style="-aw-border-insideh:0.5pt single #000000; -aw-border-insidev:0.5pt single #000000; border-collapse:collapse">
                <tr style="height:26.05pt">
                    <td style="width:173.25pt; border: 1pt solid; border-left-width:0.75pt; padding-right:5.4pt; padding-left:5.03pt; vertical-align:top; background-color:#ffffff; -aw-border-left:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span style="font-weight:bold">Weekly core Rent</span>
                        </p>
                    </td>
                    <td style="width:88.4pt; border: 1pt solid; border-right-width:0.75pt; padding-right:5.03pt; padding-left:5.4pt; vertical-align:top; background-color:#ffffff; -aw-border-right:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span style="font-weight:bold">£ undefined</span>
                </tr>
                <tr style="height:26.2pt">
                    <td style="width:173.25pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#cccccc; -aw-border:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span style="font-weight:bold">Service Charge</span>
                        </p>
                    </td>
                    <td style="width:88.4pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#cccccc; -aw-border:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span>£ ${user?.propertyDetails?.serviceCharges}</span>
                        </p>
                    </td>
                </tr>
                <tr style="height:26.45pt">
                    <td style="width:173.25pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span style="font-weight:bold">Total Eligible Rent per week</span>
                        </p>
                    </td>
                    <td style="width:88.4pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span>£ ${user?.propertyDetails?.eligibleRent}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="width:173.25pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#cccccc; -aw-border:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span style="font-weight:bold">Other Charges </span>
                        </p>
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span style="font-weight:bold">(Personal charge paid by the tenant)</span>
                        </p>
                    </td>
                    <td style="width:88.4pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; background-color:#cccccc; -aw-border:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span>£ ${user?.other_charges_of_tenant || 0 || ''}</span>
                        </p>
                    </td>
                </tr>
                <tr style="height:25.45pt">
                    <td style="width:173.25pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span style="font-weight:bold">Total Weekly Licence Charge</span>
                        </p>
                    </td>
                    <td style="width:88.4pt; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                        <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; font-size:11pt">
                            <span>£ ${user?.weeklylicencecharge}</span>
                        </p>
                    </td>
                </tr>
            </table>
            <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
            </p>
            <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                <span style="font-weight:bold">Inventory</span>
            </p>
            <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                <span style="font-weight:bold">Bedding
                    Provided:</span>
                <span style="width:10.22pt; display:inline-block">&#xa0;</span>
            </p>
            <ul type="disc" style="margin:0pt; padding-left:0pt">
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Quilt</span>
                    <span style="width:4.21pt; display:inline-block">&#xa0;</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Pillow and Pillow Case</span>
                    <span style="width:24.17pt; display:inline-block">&#xa0;</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Duvet Cover</span>
                    <span style="width:1.69pt; display:inline-block">&#xa0;</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Fitted Sheet</span>
                    <span style="width:3.51pt; display:inline-block">&#xa0;</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Window Dressing (curtains/ blinds/ net)</span>
                    <span style="width:16.09pt; display:inline-block">&#xa0;</span>
                </li>
            </ul>
            <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                <span style="-aw-import:ignore">&#xa0;</span>
            </p>
            <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                <span style="font-weight:bold">Furniture:</span>
            </p>
            <ul type="disc" style="margin:0pt; padding-left:0pt">
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Wardrobe</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Chest of Drawer</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Bed</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Mattress</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Key to the Front Door Property</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">1 Key to their Individual Room</span>
                </li>
            </ul>
            <p style="margin-top:0pt; margin-left:36pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                <span style="-aw-import:ignore">&#xa0;</span>
            </p>
            <ul type="disc" style="margin:0pt; padding-left:0pt">
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">The Room is clean, tidy and free from obstruction</span>
                    <span style="width:11.72pt; display:inline-block">&#xa0;</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">The floor and wall covering is in good condition</span>
                    <span style="width:23.31pt; display:inline-block">&#xa0;</span>
                </li>
                <li style="margin-left:34pt; text-align:justify; line-height:normal; padding-left:2pt; font-family:serif; -aw-font-family:'Symbol'; -aw-font-weight:normal; -aw-number-format:''">
                    <span style="font-family:Calibri">The electrics are in good working order e.g. light switches, sockets
                        etc.</span>
                    <span style="width:15.79pt; display:inline-block">&#xa0;</span>
                </li>
            </ul>
            <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                <span style="-aw-import:ignore">&#xa0;</span>
            </p>
            <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                <span>The structure of the room is in good
                    condition for example doors, doorframes, locks and windows. The Health &amp;Safety procedures have been
                    explained to you such as what to do in case of a fire. You have been given the Safe Smoking Policy. The
                    Licensee will be held responsible for any damage caused to the goods and or Property during their
                    occupation. Furthermore, the parties agree for the Licensor to take digital photographs at the time of
                    completing this Inventory subject to its discretion.</span>
            </p>
            <br style="page-break-before:always; clear:both"/>
            <div style="margin-right:15px;">
                <ol type="1" style="margin:0pt; padding-left:0pt">
                    <li style="margin-right:6.25pt; margin-left:32.17pt; text-align:justify; line-height:107%; padding-left:3.83pt">
                        <span>INTERPRETATION</span>
                    </li>
                </ol>
                <p style="margin:0pt 6.25pt 0.3pt 36pt; text-align:justify; line-height:107%">
                    <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-indent:18pt; text-align:justify">
                    <span>The definitions and
                        rules of interpretation in this clause apply in this licence.</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:8pt; text-indent:-126pt; text-align:justify">
                    <span>Accessways: </span>
                    <span style="width:59.37pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>the pedestrian ways,
                        driveways, forecourts, gardens and car parks within the external areas of the Property.</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:8pt; text-indent:-126pt; text-align:justify">
                    <span>Common Parts: </span>
                    <span style="width:46.53pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>the entrance halls,
                        corridors, lifts, stairways and landings serving the room and facilities.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:8pt; text-indent:-90pt; text-align:justify">
                    <span>Facilities: </span>
                    <span style="width:41.1pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span style="width:36pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>the kitchen, sitting
                        room,
                        bathroom toilet and garden.</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:8pt; text-indent:-126pt; text-align:justify">
                    <span>Furnishings: </span>
                    <span style="width:63.03pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>the Licensor's
                        furniture
                        and furnishings in the property (as set out in the Inventory).</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:8pt; text-indent:-126pt; text-align:justify">
                    <span>Inventory: </span>
                    <span style="width:74.64pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>the inventory as
                        referred to in the ‘Inventory’ section on page 2.</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:8pt; text-indent:-126pt; text-align:justify">
                    <span>Lease: </span>
                    <span style="width:89.92pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>as
                        referred to and defined in the Recitals of this licence in paragraph 4.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:8pt; text-indent:-90pt; text-align:justify">
                    <span>Licence Fee: </span>
                    <span style="width:23.96pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span style="width:36pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>is as stated in Part 1
                        of
                        this Licence Agreement</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:8pt; text-indent:-90pt; text-align:justify">
                    <span>Commencement Date: </span>
                    <span style="width:12.9pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>the Payment
                        Date.</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:8pt; text-indent:-126pt; text-align:justify">
                    <span>Licence Period: </span>
                    <span style="width:47.12pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>the period from and
                        including the date of this agreement until the date on which this licence is determined in
                        accordance
                        with clause 6.</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:8pt; text-indent:-126pt; text-align:justify">
                    <span>Licensee: </span>
                    <span style="width:75.86pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>as referred to and
                        defined in the Recitals of this licence in paragraph 2.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-indent:18pt; text-align:justify; line-height:normal">
                    <span>Licensee Information </span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Pack: </span>
                    <span style="width:95.43pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>is
                        the information supplied by the Licensor to the Licensee on induction, which shall be varied from
                        time
                        to time.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Licensor: </span>
                    <span style="width:78.31pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>as referred to and
                        defined in the Recitals of this licence in paragraph 1.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Payment Date: </span>
                    <span style="width:50.19pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>is the date the
                        payment
                        is paid to the Licensee calculated on a 4 weekly cycle and or as determined by the local housing
                        benefits authority from time to time.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Property: </span>
                    <span style="width:78.32pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>as referred to and
                        defined in the Recitals of this licence, in paragraph 3, being a hostel (as defined in the Housing
                        Act
                        1985) and or a house in multiple occupancy or unless otherwise stated</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-90pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Over Payment/Deductions: </span>
                    <span style="width:27.5pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>the amount of housing
                        benefits paid in error and or in arrears to the Licensee by the local housing benefit authority
                        during
                        the period prior to this Licence Agreement.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Room: </span>
                    <span style="width:90.55pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>bedroom or such room
                        in
                        the Property as the Licensor may allocate from time to time in accordance with clause 2.2(d).</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Support Charge: </span>
                    <span style="width:42.23pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>Is a charge for the
                        housing related support as defined in the Licensee Information Pack, which the Licensor calculates
                        annually.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-90pt; text-align:justify; line-height:normal">
                    <span>Service Charge: </span>
                    <span style="width:8.07pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span style="width:36pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>Is the cost of services
                        provided.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Support: </span>
                    <span style="width:81.36pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>Support Workers will
                        provide housing related support. This consists of more than minimal cares support or supervision. If
                        you
                        require support above and beyond this then we can signpost you on to more specialised agencies. The
                        Licensee agrees to the drawing up of an initial support plan and to the concept of receiving regular
                        support. This will consist of daily or weekly visits from a Support worker as well as the
                        cooperation in
                        achieving goals set. Failure to accept this on-going support will be interpreted as a breach of the
                        licence agreement and will result in the termination of the Licence.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>Services Provided: </span>
                    <span style="width:31.24pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>Are proportionate
                        costs,
                        determined by the Licensor, which includes, gas, electric, council tax and water rates.</span>
                </p>
                <p style="margin-top:0pt; margin-left:108pt; margin-bottom:0pt; text-indent:-108pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:144pt; margin-bottom:0pt; text-indent:-126pt; text-align:justify; line-height:normal">
                    <span>VAT: </span>
                    <span style="width:98.49pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>Value added tax
                        chargeable under the Value Added Tax Act 1994 or any similar replacement or additional tax.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'1 1'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>1.1.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>Clause headings shall not affect the interpretation of this licence.</span>
                </p>
                <p style="margin-top:0pt; margin-left:39.6pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'1 2'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>1.2.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>Unless the context otherwise requires, words in the singular shall include the
                        plural and, in the plural, include the singular.</span>
                </p>
                <p style="margin-top:0pt; margin-left:39.6pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'1 3'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>1.3.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>Unless the context otherwise requires, a reference to one gender shall include a
                        reference to the other genders.</span>
                </p>
                <p style="margin-top:0pt; margin-left:39.6pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'1 4'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>1.4.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>Any obligation in this licence on a person not to do something includes an
                        obligation not to agree or allow that thing to be done and to use their reasonable endeavours to
                        prevent
                        such act or thing being done by a third party.</span>
                </p>
                <p style="margin-top:0pt; margin-left:39.6pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'1 5'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>1.5.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>References to clauses are to the clauses of this licence.</span>
                </p>
                <p style="margin-top:0pt; margin-left:39.6pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'1 6'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>1.6.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>A working day is any day which is not a Saturday, a Sunday, a bank holiday or a
                        public holiday in England.</span>
                </p>
                <p style="margin-top:0pt; margin-left:39.6pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'1 7'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>1.7.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>Unless otherwise expressly provided, the obligations and liabilities of Licensee
                        under this licence are joint and several.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <ol start="2" type="1" style="margin:0pt; padding-left:0pt">
                    <li style="margin-left:32.17pt; text-align:justify; line-height:normal; padding-left:3.83pt">
                        <span>LICENCE
                            TO OCCUPY</span>
                    </li>
                </ol>
                <p style="margin-top:0pt; margin-left:18pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'2 1'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>2.1.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>Subject to clause 3, clause 6 and clause 8, the Licensor permits the Licensee
                        during
                        the Licence Period to:</span>
                </p>
                <p style="margin-top:0pt; margin-left:39.6pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:0pt; text-indent:-25.2pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:15.42pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:15.42pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>Occupy the Room;</span>
                </p>
                <p style="margin-top:0pt; margin-left:61.2pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:0pt; text-indent:-25.2pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:15.42pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:15.42pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>Use the Furnishings;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 61.2pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:8pt; text-indent:-25.2pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'3'; -aw-list-padding-sml:16.04pt">
                    <span style="-aw-import:ignore">
                        <span>c)</span>
                        <span style="width:16.04pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>Pass along the Accessways and Common Parts, and to use the Facilities, in common
                        with the Licensor and all others authorised by the Licensor.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:57.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%0.%1.'; -aw-list-number-styles:'decimal decimal'; -aw-list-number-values:'2 2'; -aw-list-padding-sml:3.25pt">
                    <span style="-aw-import:ignore">
                        <span>2.2.</span>
                        <span style="width:3.25pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;</span>
                    </span>
                    <span>The Licensee acknowledges that:</span>
                </p>
                <p style="margin-top:0pt; margin-left:39.6pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:0pt; text-indent:-25.2pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:15.42pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:15.42pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Licensee shall occupy the Room as a licensee and that no relationship of
                        landlord and tenant is created between the Licensor and the Licensee by this licence;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 61.2pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:0pt; text-indent:-25.2pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:15.42pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:15.42pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Licensee shall not be entitled to any statutory protection under the Housing
                        Act
                        1985 and 1988 and or the Protection From Eviction Act 1977 or any other enactment, which the
                        Licensee
                        relies upon when this licence terminates. (For the avoidance of doubt, the Licensee does not have
                        exclusive possession of the Room or Property);</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 61.2pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:0pt; text-indent:-25.2pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'3'; -aw-list-padding-sml:16.04pt">
                    <span style="-aw-import:ignore">
                        <span>c)</span>
                        <span style="width:16.04pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Licensor retains control and possession of the Room and the remainder of the
                        Property and the Licensee has no right to exclude the Licensor from the Room or remainder of the
                        Property;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 61.2pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:0pt; text-indent:-25.2pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'4'; -aw-list-padding-sml:15.42pt">
                    <span style="-aw-import:ignore">
                        <span>d)</span>
                        <span style="width:15.42pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>without prejudice to the Licensors rights under clause 6, the Licensor shall be
                        entitled at any time on giving not less than 24 hours’ notice to require the Licensee to transfer to
                        a
                        comparable room elsewhere within the Property and the Licensee shall comply with such
                        requirement;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 61.2pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:0pt; text-indent:-25.2pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'5'; -aw-list-padding-sml:15.42pt">
                    <span style="-aw-import:ignore">
                        <span>e)</span>
                        <span style="width:15.42pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Licensor is entitled to retain keys for the Room and the Property, and the
                        Licensor and any persons authorised by the Licensor may exercise the right to use these keys and
                        enter
                        the Room and the Property at any time; and</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 61.2pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:79.2pt; margin-bottom:8pt; text-indent:-25.2pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:2; -aw-list-number-format:'%2)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'6'; -aw-list-padding-sml:18.48pt">
                    <span style="-aw-import:ignore">
                        <span>f)</span>
                        <span style="width:18.48pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the licence to occupy granted by this agreement is personal to the Licensee and
                        is
                        not assignable, and the rights given in clause 2.1 may only be exercised by the Licensee.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <ol start="3" type="1" style="margin:0pt; padding-left:0pt">
                    <li style="margin-left:32.17pt; margin-bottom:8pt; text-align:justify; padding-left:3.83pt">
                        <span>LICENSEE'S
                            OBLIGATIONS</span>
                    </li>
                </ol>
                <p style="margin-top:0pt; margin-left:36pt; margin-bottom:8pt; text-align:justify">
                    <span>The Licensee
                        undertakes
                        to use the room as his/her principal home and will seek permission from the Licensor to remain away
                        from
                        the property for more than two nights in any one week. In addition, the Licensee agrees:</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:5.95pt; text-indent:-18pt; text-align:justify; line-height:112%; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to pay to the Licensor:</span>
                </p>
                <p style="margin-top:0pt; margin-left:75.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%1'; -aw-list-number-styles:'lowerRoman'; -aw-list-number-values:'1'; -aw-list-padding-sml:18.82pt">
                    <span style="-aw-import:ignore">
                        <span style="font-family:'Times New Roman'; font-size:10pt">i</span>
                        <span style="width:18.82pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Licence Fee on the Payment Date;</span>
                </p>
                <p style="margin-top:0pt; margin-left:75.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%1'; -aw-list-number-styles:'lowerRoman'; -aw-list-number-values:'2'; -aw-list-padding-sml:16.04pt">
                    <span style="-aw-import:ignore">
                        <span style="font-family:'Times New Roman'; font-size:10pt">ii</span>
                        <span style="width:16.04pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Service Support Charge on entering this licence;</span>
                </p>
                <p style="margin-top:0pt; margin-left:75.6pt; margin-bottom:0pt; text-indent:-21.6pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:1; -aw-list-number-format:'%1'; -aw-list-number-styles:'lowerRoman'; -aw-list-number-values:'3'; -aw-list-padding-sml:13.27pt">
                    <span style="-aw-import:ignore">
                        <span style="font-family:'Times New Roman'; font-size:10pt">iii</span>
                        <span style="width:13.27pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Utility Costs on entering this licence.</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 75.6pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to keep the Room, the Facilities and the Common Pans clean, tidy and clear of
                        rubbish;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'3'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>c)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to cause any damage to the Room or any other part of the Property;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'4'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>d)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to notify the Licensor of any damage to the Property or Furnishings caused by
                        the
                        Licensee or the Licensee's visitors;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'5'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>e)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to use the Room solely for-living in and not for business purposes;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'6'; -aw-list-padding-sml:11.28pt">
                    <span style="-aw-import:ignore">
                        <span>f)</span>
                        <span style="width:11.28pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to permit anyone else to stay in the Room;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'7'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>g)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to make a copy of the set of keys provided by the Licensor;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'8'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>h)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>if the Licensee loses the keys provided, to notify the Licensor without delay,
                        and
                        bear the reasonable cost of replacement keys and locks (as appropriate);</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'9'; -aw-list-padding-sml:11.89pt">
                    <span style="-aw-import:ignore">
                        <span>i)</span>
                        <span style="width:11.89pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to prevent the Licensor or any person authorised by the Licensor from
                        entering
                        into the Room and remainder of the Property;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'10'; -aw-list-padding-sml:11.89pt">
                    <span style="-aw-import:ignore">
                        <span>j)</span>
                        <span style="width:11.89pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to re-decorate the Room and not to make any alteration or addition
                        whatsoever to
                        the Room without prior written consent of the Licensor;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'11'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>k)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to smoke in the Property;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'12'; -aw-list-padding-sml:11.89pt">
                    <span style="-aw-import:ignore">
                        <span>l)</span>
                        <span style="width:11.89pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to keep any pets in the Property;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'13'; -aw-list-padding-sml:5.17pt">
                    <span style="-aw-import:ignore">
                        <span>m)</span>
                        <span style="width:5.17pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to play any musical instrument between the hours of 10 pm and 8 am;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'14'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>n)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to play loud music;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'15'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>o)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to permit any children in the Property;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'16'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>p)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to do or permit to be done in the Properly anything which is illegal or
                        which
                        may be or become a nuisance (whether actionable or not), annoyance, inconvenience or disturbance to
                        the
                        Licensor or the Licensor's agents or to the other residents of the Property and their visitors or
                        any
                        owner or occupier of neighbouring property; </span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'17'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>q)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to cause or permit to be caused any damage to:</span>
                </p>
                <ol type="i" style="margin:0pt; padding-left:0pt">
                    <li style="margin-left:77pt; text-align:justify; padding-left:13pt">
                        <span>the Property or any
                            neighbouring
                            property; or</span>
                    </li>
                    <li style="margin-left:77pt; text-align:justify; padding-left:13pt">
                        <span>any property of the owners or
                            occupiers of the Property or any neighbouring property;</span>
                    </li>
                </ol>
                <p style="margin:0pt 6.25pt 0pt 90pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'18'; -aw-list-padding-sml:10.67pt">
                    <span style="-aw-import:ignore">
                        <span>r)</span>
                        <span style="width:10.67pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to obstruct the Accessways or Common Parts;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'19'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>s)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to do anything that will or might vitiate in whole or in part any insurance
                        in
                        respect of the Property, or increase the insurance premium;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'20'; -aw-list-padding-sml:11.28pt">
                    <span style="-aw-import:ignore">
                        <span>t)</span>
                        <span style="width:11.28pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to observe any reasonable rules and regulations the Licensor makes and notifies
                        to
                        the Licensee from time to time governing the Licensees use of the Room and Facilities;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'21'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>u)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to leave the Room in a clean and tidy condition and to remove the Licensee's
                        possessions at the end of the Licence Period;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'22'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>v)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <a name="_Hlk515748152">
                        <span>to indemnify the Licensor and keep the Licensor
                            indemnified
                            against all losses, claims, demands</span>
                    </a>
                    <span>, actions, proceedings, damages, costs,
                        expenses
                        or other liability in any way arising from:</span>
                </p>
                <ol type="i" style="margin:0pt; padding-left:0pt">
                    <li style="margin-left:77pt; text-align:justify; padding-left:20.2pt">
                        <span>this licence, the Service
                            Support Charge and Utility Costs;</span>
                    </li>
                    <li style="margin-left:77pt; text-align:justify; padding-left:20.2pt">
                        <span>any breach of the Licensee's
                            undertakings contained in clause 3; and/or</span>
                    </li>
                    <li style="margin-left:77pt; text-align:justify; padding-left:20.2pt">
                        <span>any shortfall in the Over
                            Payment Deductions, which is not met by the local housing benefit authority;</span>
                    </li>
                    <li style="margin-left:77pt; text-align:justify; padding-left:20.2pt">
                        <span>the exercise of any rights
                            given
                            in clause 2; and</span>
                    </li>
                </ol>
                <p style="margin:0pt 6.25pt 0pt 97.2pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'23'; -aw-list-padding-sml:6.39pt">
                    <span style="-aw-import:ignore">
                        <span>w)</span>
                        <span style="width:6.39pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to do anything that would or might cause the Licensor to be in breach of the
                        tenant's covenants and the conditions contained in the Lease;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'24'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>x)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to permit or use your own electrical appliance in the Room without prior
                        consent
                        of the Licensor.</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'25'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>y)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>not to tamper with the electricity and gas appliances supplied in the Room or
                        Property.</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'26'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>z)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>No visitors permitted in the Room and or the Property between the hours of 10pm
                        and
                        9am.</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span>(This
                        is
                        not an exhaustive list).</span>
                </p>
                <p style="margin:0pt 6.25pt 0.3pt 54pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span>4. </span>
                    <span style="width:23.77pt; display:inline-block">&#xa0;</span>
                    <span>LICENSOR'S OBLIGATIONS</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-indent:36pt; text-align:justify">
                    <span>The Licensor agrees
                        and
                        undertakes:</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to provide the Licensee with one set of keys for the Room and Property on
                        payment of
                        a Deposit</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to provide the Licensee with Bedding, (where necessary), on payment of a
                        Deposit;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'3'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>c)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>to pay the council tax in respect of the Property;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'4'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>d)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>if the Licensor wishes to demand payment of the Service Support Charge pursuant
                        to
                        clause 3(a)(ii) and Utility Costs pursuant to clause 3(a)(iii) in advance, not to demand more than 2
                        weeks' payment in advance; and</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:8pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'5'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>e)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Licensor shall provide the Licensee and the support worker designated to the
                        Licensee with a copy of the Licensee Information Pack on request and in any event shall make
                        available a
                        copy of the Licensee Information Pack at its registered office.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span>5. </span>
                    <span style="width:23.77pt; display:inline-block">&#xa0;</span>
                    <span>HEALTH AND SAFETY</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-indent:36pt; text-align:justify; line-height:normal">
                    <span>The
                        Licensor confirms that:</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Furnishings are fire resistant;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>a valid gas safety certificate and an electrical certificate is available for
                        inspection by the Licensee; and</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:8pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'3'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>c)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the electrical appliances provided by the Licensor are safe and in a working
                        condition which meet the minimum standards in the UK.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span>6.</span>
                    <span style="-aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    <span style="width:11.55pt; display:inline-block">&#xa0;</span>
                    <span>TERMINATION</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-indent:36pt; text-align:justify; line-height:normal">
                    <span>6.1
                        The licence to occupy granted by this agreement shall end:</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>by mutual consent of the patties (in writing);</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:8pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>upon the expiry of not less than 7 days’ notice given by the Licensor to the
                        Licensee if the Licensee breaches any of the Licensee’s obligations contained in clause 3 subject to
                        the
                        Licensor's sole discretion unless clause 6.1 (c) and (d) apply; and</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'3'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>c)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>immediately on committing or being an accessory a serious criminal
                        offence</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'4'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>d)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>(Excluding minor motoring offences) and or criminal damage to the Property;
                        and</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'5'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>e)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>immediately on committing violence, threatening behaviour, against the staff or
                        any
                        member of the Licensor or other in the Property.</span>
                </p>
                <p style="margin:0pt 6.25pt 0.3pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-indent:36pt; text-align:justify; line-height:normal">
                    <span>6.2</span>
                    <span style="-aw-import:spaces">&#xa0;&#xa0;&#xa0;</span>
                    <span>Termination is without
                        prejudice to the rights of either party in connection with any</span>
                    <span style="-aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    <span style="width:8.49pt; display:inline-block">&#xa0;</span>
                    <span style="-aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    <span>antecedent
                        breach of any obligation subsisting under this licence.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-indent:36pt; text-align:justify; line-height:normal">
                    <span>6.3</span>
                    <span style="-aw-import:spaces">&#xa0;&#xa0;&#xa0;</span>
                    <span>Consequently, in the
                        event
                        of termination pursuant to clause 6.1:</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>all unclaimed items belonging to the Licensee will be kept by the Licensor for a
                        reasonable period of time determined at the sole discretion of the Licensor in any event for a
                        period of
                        21 days on vacating the Room after which the unclaimed items will be disposed of;</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:8pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Licensee to collect his Deposit from the Licensor and to return all keys for
                        the
                        Room and Property and the bedding, where relevant; and</span>
                    <span style="-aw-import:spaces">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; line-height:normal; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'3'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>c)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the Licensee not to remove any property belonging to the Licensor or a third
                        party
                        from the Room and or Property.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span>7</span>
                    <span style="-aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    <span style="width:8.49pt; display:inline-block">&#xa0;</span>
                    <span>LIMITATIONS OF LICENSOR'S
                        LIABILITY</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-indent:36pt; text-align:justify; line-height:normal">
                    <span>7.1
                        Subject to clause 7.2, the Licensor is not liable for:</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the death of, or injury to, the Licensee or visitors to the Property; or</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>damage to, or theft of, any possessions of the Licensee or the Licensee's
                        invitees
                        to the Property;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'3'; -aw-list-padding-sml:8.84pt">
                    <span style="-aw-import:ignore">
                        <span>c)</span>
                        <span style="width:8.84pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>any losses, claims, demands, actions, proceedings, damages, costs or expenses or
                        other liability incurred by Licensee or the Licensees invitees to the Property in the exercise or
                        purported exercise of the rights granted by clause 2; or</span>
                </p>
                <p style="margin:0pt 6.25pt 0pt 36pt; text-indent:-0.25pt; text-align:justify; line-height:107%">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:8pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'4'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>d)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>the acts or omissions of any other resident of the Property or their visitors.
                    </span>
                </p>
                <p style="margin-top:0pt; margin-left:36pt; margin-bottom:8pt; text-align:justify">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-indent:36pt; text-align:justify; line-height:normal">
                    <span>7.2
                        Nothing in clause 7.1 shall limit or exclude the Licensor's liability for:</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
                    <span style="-aw-import:ignore">&#xa0;</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:0pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'1'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>a)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>death or personal injury or damage to property caused by negligence on the part
                        of
                        the Licensor or its agents; or</span>
                </p>
                <p style="margin-top:0pt; margin-left:54pt; margin-bottom:8pt; text-indent:-18pt; text-align:justify; -aw-import:list-item; -aw-list-level-number:0; -aw-list-number-format:'%0)'; -aw-list-number-styles:'lowerLetter'; -aw-list-number-values:'2'; -aw-list-padding-sml:8.22pt">
                    <span style="-aw-import:ignore">
                        <span>b)</span>
                        <span style="width:8.22pt; font:7pt 'Times New Roman'; display:inline-block; -aw-import:spaces">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</span>
                    </span>
                    <span>any matter in respect of which it would be unlawful for the Licensor to exclude
                        or
                        restrict liability.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span>8</span>
                    <span style="width:29.88pt; display:inline-block">&#xa0;</span>
                    <span>SUPPORTS</span>
                </p>
                <p style="margin-top:0pt; margin-left:36pt; margin-bottom:8pt; text-align:justify">
                    <span>Support consists of
                        the
                        drawing up of an initial support plan and the joint co-operation of working with support staff to
                        address and achieve weekly support goals.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span>9</span>
                    <span style="width:29.88pt; display:inline-block">&#xa0;</span>
                    <span>VAT</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-indent:36pt; text-align:justify">
                    <span>All sums payable by
                        the
                        Licensee are exclusive of any VAT that may be chargeable.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span>10</span>
                    <span style="width:23.76pt; display:inline-block">&#xa0;</span>
                    <span>RIGHTS OF THIRD PARTIES</span>
                </p>
                <p style="margin-top:0pt; margin-left:36pt; margin-bottom:8pt; text-align:justify">
                    <span>A person who is not
                        a
                        patty to this licence may not enforce any of its terms under the Contracts (Rights of Third Parties)
                        Act
                        1999.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span>11</span>
                    <span style="width:23.76pt; display:inline-block">&#xa0;</span>
                    <span>CONFIDENTIALITIES WAVIER</span>
                </p>
                <p style="margin-top:0pt; margin-left:36pt; margin-bottom:8pt; text-align:justify">
                    <span>The Licensee agrees
                        and
                        gives his consent to the Licensor to request access to his personal information held by the local
                        housing benefits office (electronically or hard copy). The Licensor further has authority to
                        disclose
                        such personal information to other relevant authorities, organisations and or other third parties.
                        In
                        such instances, the Licensor agrees to keep the Licensee informed of the information request and or
                        disclosed.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span>12</span>
                    <span style="width:23.76pt; display:inline-block">&#xa0;</span>
                    <span>MISCELLANEOUS</span>
                </p>
                <p style="margin-top:0pt; margin-left:72pt; margin-bottom:8pt; text-indent:-36pt; text-align:justify">
                    <span>12.1
                    </span>
                    <span style="width:11.53pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>The
                        Licensor is
                        under an obligation to allow access to the police to carry out its duties of stop, search and
                        seizure of
                        any person and or property (under the relevant legislation in force at the time), in circumstances
                        where
                        it is deemed necessary. The Licensee agrees with the Licensor to co-operate with the police under
                        the
                        terms of this agreement.</span>
                </p>
                <p style="margin-top:0pt; margin-left:72pt; margin-bottom:8pt; text-indent:-36pt; text-align:justify">
                    <span>12.2
                    </span>
                    <span style="width:11.53pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>The parties
                        agree that this agreement supersedes all previous communication between the parties and in
                        circumstances
                        where there is any conflict between this written agreement and any previous communication (written
                        or
                        verbal), this agreement shall prevail.</span>
                </p>
                <p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
                    <span>13</span>
                    <span style="width:23.76pt; display:inline-block">&#xa0;</span>
                    <span>GOVERNING LAW AND JURISDICTION</span>
                </p>
                <p style="margin-top:0pt; margin-left:72pt; margin-bottom:8pt; text-indent:-36pt; text-align:justify">
                    <span>13.1
                    </span>
                    <span style="width:11.53pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>This
                        licence
                        and any dispute or claim arising out of or in connection with it or its subject matter or formation
                        (including non-contractual disputes or claims) shall be governed by and construed in accordance with
                        the
                        law of England and Wales.</span>
                </p>
                <p style="margin-top:0pt; margin-left:72pt; margin-bottom:8pt; text-indent:-36pt; text-align:justify">
                    <span>13.2
                    </span>
                    <span style="width:11.53pt; text-indent:0pt; display:inline-block">&#xa0;</span>
                    <span>The parties
                        irrevocably agree that the courts of England and Wales shall have exclusive jurisdiction to settle
                        any
                        dispute or claim that arises out of or in connection with this licence or its subject matter or
                        formation (including non-contractual disputes or claims).</span>
                </p>
            </div>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span style="-aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span style="-aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span>THIS LICENCE HAS BEEN ENTERED INTO ON THE
                    DATE STATED AT THE BEGINNING OF IT.</span>
</p>
<p style="margin-top:0pt; margin-left:0.5pt; margin-bottom:11.4pt; text-align:justify">
    <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-left:0.5pt; margin-bottom:11.4pt; text-align:justify">
    <span style="font-weight:bold">Declaration:</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span>Before signing this Licence, I have been
                    requested to read, and I understand the terms in this Licence. </span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <a name="_Hlk517704385">
        <span style="font-weight:bold; font-style:italic; -aw-import:ignore">&#xa0;</span>
    </a>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span style="font-weight:bold; font-style:italic">Print Name:${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <a name="_Hlk517704403">
        <span style="font-weight:bold">Signed </span>
    </a>
    <span style="font-weight:bold">by
                    the Licensee</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="-aw-import:spaces"></span>
    <img loading="lazy" style="width: 150px;" src="${user?.licenseChargePayments}"/>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="font-family:'Courier New'; font-size:10pt">THIS LICENCE, effective from the date: 03-07-2024</span>
    <span style="width:23.96pt; display:inline-block">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="font-weight:bold">Signed</span>
    <span>by an authorised person nominated by the </span>
    <span style="font-weight:bold">Licensor</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="font-weight:bold">(${user?.rslDetails?.rslname})</span>
</p>
<p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; line-height:normal">
    <span style="-aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span style="font-weight:bold; font-style:italic; -aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span style="font-weight:bold; font-style:italic">Print Name: ${user?.addedBy?.fname} ${user?.addedBy?.lname} ${user?.addedBy?.role}</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span style="font-weight:bold; font-style:italic; -aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span style="font-weight:bold; font-style:italic; -aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-align:justify">
    <span style="font-weight:bold">
        Signed: <img loading="lazy" style="width: 230px;" src="${user?.staffSignature}"/>
    </span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt; text-indent:36pt">
    <span style="-aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt">
    <span style="-aw-import:ignore">&#xa0;</span>
</p>
<p style="margin-top:0pt; margin-bottom:8pt">
    <span style="-aw-import:ignore">&#xa0;</span>
</p>
</div></body></div>`,
        your_weekly_service_charge: `<div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;"><div style="font-family: calibri;" class="">

    <h3><strong>YOUR WEEKLY SERVICE CHARGE</strong></h3>
    <p>&nbsp;</p>
    <p><strong><u>What the service charge is for:</u></strong></p>
    <p style="text-align:justify;">Our service charge - &pound; ${user?.propertyDetails?.serviceCharges} per week &ndash; represents payment in respect of the costs of heating,
        lighting, hot water, water rates, and a service of support. Payment of these charges is a requirement if you
        wish to reside at Ash-Shahada Housing Association properties. None of these charges are covered by housing
        benefit and it is expected by the government that you use your benefits &ndash; or other sources of personal
        income &ndash; to pay for food, fuel and utilities. You would have to pay for things yourself wherever you
        choose to live.</p>
    <p><strong><u>The maximum level of arrears</u></strong></p>
    <p style="text-align:justify;">It is company policy not to allow anyone to carry arrears of more that the equivalent of two weeks service
        charge, namely &pound;30. When your arrears reach &pound;30 or more, we will discuss the matter with you, with a
        view to helping you reduce your debt. If you allow your debts to increase whilst making no attempt to reduce
        them, you will be evicted from your accommodation. We will also inform your next landlord of your rent arrears.
    </p>
    <p><strong><u>Why you need to keep your service charge payments up to date</u></strong></p>
    <p style="text-align:justify;">A record of rental or service charge arrears may harm your chances of finding alternative accommodation in the
        future. Almost all housing associations/landlords will ask your current or previous landlord for a reference in
        regard to how trustworthy you are as a tenant. It is therefore strongly in your own interests to keep your
        payments up to date.</p>
    <p>&nbsp;</p>
    <p>I <b>${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}</b> agree to pay my service charge of &pound;${user?.propertyDetails?.serviceCharges} per week.</p>
    <p>&nbsp;</p>
    <p>Signed: <img loading="lazy" style="width: 150px;" src="${user?.weeklyServiceCharge}"/></p>
    <p>Date: ${getDate(user?.signInDate)}</p>
    <p>&nbsp;</p>
    </div></div>`,
        fire_evacuation_procedure_for_all_residents: `<div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;"><div class="">
    <div class="calibri">
        <p align="center"><strong>FIRE EVACUATION PROCEDURE FOR ALL RESIDENTS</strong></p>
        <p align="center"><strong>In the event of Fire or Smoke detection the Fire Smoke Alarms will Activate and should
                there be any power loss the Emergency Lighting will Activate.</strong></p>
        <p>The fullowing procedure must be strictly adhered to in case of a fire. You will find Fire Exit signs
            displayed around the Home highlighting the Escape Route:</p>
        <ul>
            <li class="">Upon hearing the fire alarm, you must evacuate the building immediately using the nearest means
                of escape exits as detailed below:</li>
        </ul>
        <p align="center"><strong><u>DO NOT DELAY BY CulLECTING BELONGINGS</u></strong></p>
        <p>&nbsp;</p>
        <p><strong>LOCATION OF MEANS OF ESCAPE FIRE EXITS</strong></p>
        <p><strong>Fire means of escape exit locations as highlighted in property.</strong></p>
        <div class="margin">
            <ul>
                <li class="">Front Door</li>
                <li class="">Emergency fire escapes</li>
            </ul>
            <p><strong>Please do not use the lifts in the event of fire (Where Applicable)</strong></p>
            <ul>
                <li class="">You must alert the emergency services straight away. DIAL <strong>999 or 112</strong>
                    Emergency Services.</li>
            </ul>
            <ul>
                <li class="">You must wait at the assembly point (<strong>On the Street outside Front left of House (if
                        possible) or Very Back of the Garden</strong>) while the emergency services arrive.</li>
            </ul>
            <ul>
                <li class="">Wait for the all clear to be given by Emergency Services before re-entering the building.
                </li>
            </ul>
            <p><strong><u>FIRE ALARM</u></strong></p>
            <p class="">A fire detection and alarm system is fitted to this building to help ensure the safe evacuation
                of people in the event of a fire. It is important that tenants understand their rule in the event of an
                alarm sounding.</p>
            <ul>
                <li class="">If you discover a fire, sound the alarm and call <strong>999</strong> for the Fire &amp;
                    Rescue Service.</li>
                <li class="">Unless sounded briefly at the pre-arranged test time,<strong><u>
                        </u></strong><strong><u>TREAT ALL ALARMS AS AN INDICATION OF FIRE IN THE BUILDING.</u></strong>
                </li>
                <li class="">If you suspect you may have activated the alarm, for example by burning toast, check the
                    sensor to see if the red light is on.</li>
                <li class="1"><span class="CharacterStyle2">Leave your accommodation promptly along with any
                        guests.</span></li>
                <li class="1"><span class="CharacterStyle2">Close the door to your accommodation <strong><u>but do not
                                lock it.</u></strong></span></li>
                <li class="1"><span class="CharacterStyle2">Only use any firefighting equipment provided if needed to
                        ensure your safe evacuation.</span></li>
                <li class="">Assemble outside the building and account for other residents if possible.</li>
                <li class="">Unless confirmed by others it has been done, dial <strong>999 </strong>for the Fire &amp;
                    Rescue Service.</li>
                <li class="1"><span class="CharacterStyle2"><strong><u>Do not silence or reset the
                                alarm</u></strong></span><span class="CharacterStyle2"> unless you are absulutely
                        certain it was activated from a sensor in your own accommodation, and that </span>there is no
                    fire.</li>
                <li class="1"><span class="CharacterStyle2">Report all alarm activations to the Manager.</span></li>
            </ul>
        </div>
        <p class="1" align="center"><span class="CharacterStyle2"><strong><u>NOTE: It is a criminal offence to tamper
                        with or disable any part of the fire alarm system.</u></strong></span></p>
        <p align="center"><strong><em>I have read the above</em></strong></p>
        <p align="center"><strong><em>I understand the pulicy </em></strong></p>
        <p align="center"><strong><em>I hereby acknowledge all of the above</em></strong></p>
        <p>Please sign to say you have read the above fire procedure and understand it.</p>
        <br>
        <p><b>Resident</b></p>
        <p>Name:${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}</p>
        <p>Signature:</p>
        <p><img  loading="lazy" style="width: 150px;" src="${user?.fireEvacuationProcedure}"/></p>
        <br>
        <p><b>Staff</b></p>
        <p>Name: ${user?.addedBy?.fname || ''} ${user?.addedBy.lname || ''} ${user?.addedBy?.role || ''}</p>
        <p>Signature:</p>
        <p><img loading="lazy" style="width: 230px;" src="${user?.staffSignature}"/></p>
    </div>
</div></div>`,

        authorization_form: `<div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;">
    <div style="font-family: calibri;" class="">
        <h3>
            <strong>Authorisation Form</strong>
        </h3>
        <p>To whom it may concern,</p>
        <p style="text-align: justify;">
            <strong>I  ${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''} of ${user?.propertyDetails.address} ${user?.propertyDetails.area || ''} ${user?.propertyDetails.city || ''}  ${user?.propertyDetails.postCode || ''}</strong>
            <strong></strong>
            <strong>
                <em>Date of Birth: ${getDate(user?.dateOfBirth)} National Insurance No ${user?.nationalInsuranceNumber}</em>
            </strong>
            ,hereby give full consent and authorisation to Birmingham City Council to check internally with
        Department of works and pensions, for the benefit I am currently in receipt of, also discuss all matters and
        aspects of my claim in relation to my Housing Benefit with staff from Ash-shahada Housing Association Limited
        and my support provider Forward Housing.
        </p>
        <p>&nbsp;</p>
        <p>
            <em>
                Kind regards (signature) :<br>
                <img loading="lazy" style="width: 150px;" src="${user?.authorizationForm}"/>
            </em>
        </p>
        <p>&nbsp;</p>
    </div>
</div>
`,
        missing_person_form: `<div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;"><div style="font-family: calibri;" class="">
    <h3>MISSING PERSON FORM</h3>
    <p style="text-align: justify;">As a service provider we have duty to act if we have not been able to establish
        contact with you for a period of time. This generally involves contacting the named next of kin, or occasionally
        filing a missing person&rsquo;s report to the police. This is always done with the best interests of the service
        user in mind. In order for us to do this effectively we need to store some personal details about you on your
        file. The details you give will only be used in the circumstances outlined above.</p>
    <p>Please provide us with the following details as accurately as possible, to the best of your knowledge.</p>
    <p>Full Name <b>${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}</b></p>
    <p>Address <b> ${user?.propertyDetails.address} ${user?.propertyDetails.area || ''} ${user?.propertyDetails.city || ''}  ${user?.propertyDetails.postCode || ''}</b> </p>
    <p>Mobile phone number <b>07725 985704</b></p>
    <p>Date of birth <b>${getDate(user?.dateOfBirth)}</b></p>
    <p>NINO <b>${user?.nationalInsuranceNumber}</b></p>
    <p>Details of employer /college etc, e.g., name address contact number, position held, Subject studied; hours attended</p>
    <p>Height <b>${user?.height}</b></p>
    <p>Shoe size <b>${user?.shoeSize}</b></p>
    <p>Clothing size <b>${user?.clothingSize}</b></p>
    <p>Build e.g. small, medium, large <b>${user?.build}</b></p>
    <p>Details of any distinguishing marks, e.g. tattoos, birthmarks etc <b>No</b></p>
    <p>Ethnicity <b>No</b></p>
    <p>Skin Tone <b>${user?.skinTone}</b></p>
    <p>Hair colour <b>${user?.hairColor}</b></p>
    <p>Eye colour <b>${user?.eyeColor}</b></p>
    <p>Details of any vehicle used i.e. car / bike etc. details of colour, make, registration number etc. <b></b></p>
    <br>
    <p>Details of any potential risk:</p>
    <p><b>Having alcohol consumption issues.
''</b></p>
    <br>
    <p><strong>Details of next of kin:</strong></p>
    <p>Name: <b></b></p>
    <p>Address: <b></b></p>
    <p>Contact number, land line and mobile number: <b></b></p>
    <p>Relationship: <b>No</b></p>
    <p>Any other relevant contacts: <b></b></p>
    <br>
    <p><strong>Details of any areas / destinations likely to visit</strong></p>
    <p><b></b></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Name: <b>${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}</b></p>
    <p>Signature: <img loading="lazy" style="width: 150px;" src="${user?.missingPersonForm}"/></p>
    <p>&nbsp;</p>
    <p>Date : ${getDate(user?.signInDate)}<b></b></p>
</div></div>`,
tenant_photographic_id_consent_form:`
<div style="margin-top: 52px!important; width: 700px;margin: auto;padding: 25px;border: 1px solid black;">
    <div style="font-family: calibri;">
        <h3 style="text-align:center">
            <span style="font-weight:bold;">TENANT PHOTOGRAPHIC ID
                CONSENT FORM</span>
        </h3>
        <p>
            <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
        </p>
        <p style="text-align:justify">
            <span>The Support Provider is required to collect a form of photographic ID for
                each tenant as per guidelines set by Birmingham City Council and West Midlands Police pertaining to
                Supported Accommodation.</span>
        </p>
        <p style="text-align:justify">
            <span style="-aw-import:ignore">&#xa0;</span>
        </p>
        <p>
            <span>Support Provider Company: </span>
            <span style="width:17.73pt; display:inline-block">&#xa0;</span>
            <span>
                <b>Fis forward housing </b>
            </span>
        </p>
        <p>
            <span>Tenant Name:</span>
            <span style="width:8.59pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span>
                <b>${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}</b>
            </span>
        </p>
        <p>
            <span>Tenant NiNo:</span>
            <span style="width:12.7pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span>
                <b>${user?.nationalInsuranceNumber}</b>
            </span>
        </p>
        <p>
            <span>Tenant D.O.B:</span>
            <span style="width:9.64pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span>
                <b>${getDate(user?.dateOfBirth)}</b>
            </span>
        </p>
        <p>
            <span>Property Address: </span>
            <span style="width:25.18pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span>
                <b></b>
            </span>
        </p>
        <p>
            <span style="font-weight:bold; -aw-import:ignore">&#xa0;</span>
        </p>
        <p>
            <span style="font-weight:bold; text-decoration:underline">TO BE COMPLETED BY THE TENANT</span>
        </p>
        <p>
            <span>Please tick </span>
            <span style="font-weight:bold"> </span>
            <span>of the following as applicable:
            </span>
        </p>
        <table cellspacing="0" cellpadding="0" class="TableGrid3" style="    margin: auto; border:0.75pt solid #000000; -aw-border:0.5pt single; -aw-border-insideh:0.5pt single #000000; -aw-border-insidev:0.5pt single #000000; border-collapse:collapse">
            <tr style="height:54.2pt">
                <td style="width:auto; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>1</span>
                    </p>
                </td>
                <td style="width:auto; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-left:0.5pt single; -aw-border-right:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>I have provided a form of photographic ID </span>
                    </p>
                </td>
                <td style="width:auto; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>
                            <b>No</b>
                        </span>
                    </p>
                </td>
            </tr>
            <tr>
                <td style="width:auto; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single; -aw-border-top:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>2</span>
                    </p>
                </td>
                <td style="width:auto; border-style:solid; border-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>I have given permission for the Support Provider
                            to take a photograph of me and hold it on file. </span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                </td>
                <td style="width:auto; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>
                            <b>No</b>
                        </span>
                    </p>
                </td>
            </tr>
            <tr>
                <td style="width:auto; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-right:0.5pt single; -aw-border-top:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>3</span>
                    </p>
                </td>
                <td style="width:auto; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-left:0.5pt single; -aw-border-right:0.5pt single; -aw-border-top:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>I do not wish to disclose my picture.</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                </td>
                <td style="width:auto; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; padding-right:5.03pt; padding-left:5.03pt; vertical-align:top; -aw-border-bottom:0.5pt single; -aw-border-right:0.5pt single">
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span style="-aw-import:ignore">&#xa0;</span>
                    </p>
                    <p style="margin-bottom:0pt; font-size:11pt">
                        <span>
                            <b>Yes</b>
                        </span>
                    </p>
                </td>
            </tr>
        </table>
        <p>
            <span style="-aw-import:ignore">&#xa0;</span>
        </p>
        <p>
            <span>I agree to be contacted via my Support Provider to confirm the above. </span>
        </p>
        <p>
            <span style="-aw-import:ignore">&#xa0;</span>
        </p>
        <p>
            <span>Tenant Signature: </span>
            <span style="width:26.16pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span>
                <img style="width: 150px;" src="${user?.tenantSignature}"/>
            </span>
        </p>
        <p>
            <span>Date: </span>
            <span style="width:9.38pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span style="width:36pt; display:inline-block">&#xa0;</span>
            <span>
                <b>${getDate(user?.signInDate)}</b>
            </span>
        </p>
    </div>
</div>
`
    };


    return templates[type];
};

export default DocumentTemplate;