import user from "../DB/Schema/userSchema.js";
import { generateOTP } from "../Utils/CommonFunctions.js";
import sendMail from "../Utils/email.service.js";

export const SendOtpForLogin = async (EmailTo, otp) => {
    try {

        

        let isSended = await sendMail({
            from: process.env.SMTP_USER,
            to: EmailTo,
            subject: `Log in OTP:${otp}`,
            html: `
                 <!DOCTYPE html>
                  <html>
                   <head>
                  <style>
        .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #4a90e2;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4a90e2;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Verification OTP</h1>
        </div>
        <div class="content">
            
            <p>This Your OTP for Login in 3access:</p>
            <div style="text-align: center;">
                <h2 class="button" >${otp}</h2>
            </div>
            <p>This OTP will expire in 24 hours for security purposes.</p>
            <p>If you didn't create an account, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} 3Access. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>`
        })

        if (isSended?.success === true) {

            return isSended

        } else {
            return null
        }

    } catch (error) {
        console.log("error in modal", error);

    }
}