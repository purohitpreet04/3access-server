import mongoose, { isObjectIdOrHexString } from "mongoose";
import { generateOTP, generateToken, generateVerificationToken, HandleError } from "../Utils/CommonFunctions.js"
import bcrypt from 'bcryptjs';
import user from "../DB/Schema/userSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";
import RSL from "../DB/Schema/RSLSchema.js";
import sendMail from "../Utils/email.service.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).send({ message: 'Please provide email and password', severity: 'error' });
        }

        let User = await user.findOne({ email }).lean();
        if (['company'].includes(User?.role)) {
            return res.status(401).send({ message: 'Access Denied', severity: 'error' });
        }

        if (['agent'].includes(User?.role) && [0].includes(User?.status) && [0].includes(User?.isMainMA)) {
            return res.status(401).send({ message: "You don't have access!", severity: 'error' });
        }

        let isStaff = false;
        let addedByData = null;

        if (!User) {
            User = await Staff.findOne({ email, status: 0 }).lean();
            isStaff = !!User;
           let addedBy_user = await user.findById(new mongoose.Types.ObjectId(User?.addedBy), { password: 0 }).lean()
            if (['agent'].includes(addedBy_user?.role) && [0].includes(addedBy_user?.status) && [0].includes(addedBy_user?.isMainMA)) {
                return response.status(401).send({ message: 'Access denied!', severity: 'error' });
            }
            if (isStaff && User.addedBy) {
                addedByData = await user.findById(new mongoose.Types.ObjectId(User?.addedBy), { password: 0 }).lean();
            }
        }

        if (!User) {
            return res.status(401).send({ message: 'User Not Found!', severity: 'error' });
        }

        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid Password or email credentials', severity: 'error' });
        }

        const responseData = {
            token: generateToken(User._id),
            success: true,
            user: {
                address: User.address,
                fname: User.fname,
                lname: User.lname,
                email: User.email,
                role: User.role,
                _id: User._id,

            },
        };

        if (isStaff) {
            responseData.user['permmission'] = User?.permission
        }
        if (['company'].includes(User.role)) {
            responseData.user['companyname'] = User?.companyname
        }
        if (isStaff && addedByData) {
            responseData.user.username = User?.username
            responseData.user.addedBy = {
                _id: addedByData?._id,
                fname: addedByData?.fname,
                lname: addedByData?.lname,
                email: addedByData?.email,
                role: addedByData?.role,
                phonenumber: addedByData?.phonenumber,
                coruspondingEmail:addedByData?.coruspondingEmail
            };
        }
        return res.status(200).json(responseData);
    } catch (error) {
       return HandleError(req, res, error)
    }
}


export const registerUser = async (req, res) => {
    try {
        const {
            coruspondingEmail,
            fname,
            lname,
            email,
            password,
            phonenumber,
            address,
            area,
            city,
            companyname,
            pincode,
            website,
            role
        } = req.body;

        if (!fname || !lname || !email || !password || !phonenumber || !address || !city) {
            return res.status(400).json({ error: 'All required fields must be provided', severity: 'error', success: false });
        }


        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists with this email', severity: 'error', success: false, page: 1 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const newUser = new user({
            emailcc:'',
            emailto:coruspondingEmail,
            coruspondingEmail,
            fname,
            lname,
            email,
            password: hashedPassword,
            phonenumber,
            address,
            area,
            city,
            companyname,
            pincode,
            website,
            role,
            verificationToken,
            verificationTokenExpires,
            status: 0
        });

        await newUser.save();
        try{
        if (newUser?._id) {
            await RSL.updateMany(
                { status: 0 },
                { $addToSet: { visibleTo: newUser?._id } }
            );
        }
        const verificationLink = `${process.env.FRONTEND_URL}auth/verify-user/${newUser?._id}/${verificationToken}`;
       let isSended = await sendMail({
            from:process.env.SMTP_USER,
            to:email, 
            subject: 'Email for Verification',
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
            <h1>Welcome to Our Platform!</h1>
        </div>
        <div class="content">
            <p>Hello ${fname},</p>
            <p>Thank you for joining us! Please click the button below to verify your email address:</p>
            <div style="text-align: center;">
                <a href="${verificationLink}" class="button">Verify Email Address</a>
            </div>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all;">${verificationLink}</p>
            <p>This link will expire in 24 hours for security purposes.</p>
            <p>If you didn't create an account, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>`
        })
        // console.log(isSended);
        if(isSended?.success === true){
            return res.status(200).send({message:'Verification link sended To your Email', success:true})
        }else{
            return res.send({message:'Error While Sending Email', success:true})
        }
        
    }catch(e){
        console.log(e);
    }

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Internal server error', severity: 'error', success: false });
    }
}


export const VerifyByLink = async (req, res) =>{
    try {
        const {token, _id} = req.query;
        

        
        const User = await user.findOne({
           
            $or:[
                { _id },
                {verificationToken: token, verificationTokenExpires: { $gt: new Date() }},
            ]
            
            
        });

        
        if(User?.status === 1){
           return res.send({
                isVerified:true,
                message: "Account has been verified.",
                severity:'success'
            });
        }


        if(!['agent'].includes(User?.role)){
           return res.send({
                isVerified:false,
                message: "Don't have access"
            });
        }

        if (!User) {
            return res.send({
                isVerified:false,
                message: 'Invalid or expired verification token'
            });
        }

        User.status = 1;
        User.verificationToken = undefined;
        User.verificationTokenExpires = undefined;
        await User.save();

        res.json({
            isVerified:true,
            message: 'Email verified successfully. You can now log in.'
        });
        

    } catch (error) {
        console.log(error);
        return HandleError(req, res, error)
    }
}





// export const fetchUserDetails = async (req, res) => {
//     try {
//         const userId = req.headers['user']
//         if (!isObjectIdOrHexString(userId)) {
//             return res.status(401).send({ message: 'User data is not valid', severity: 'error' });
//         }

//         const User = await user.findById({ "_id": userId }, { password: 0 }).lean()
        
//         if (!User) {
//             return res.status(401).send({ message: 'User Not Found!', severity: 'error' });
//         }
//         console.log(User);
        
//         if (['agent'].includes(User?.role) && [0].includes(User?.status)) {
//             return res.status(401).send({ message: 'Access denied!', severity: 'error' });
//         }
//         return res.status(200).json({
//             success: true,
//             user: User,
//         });

//     } catch (error) {
//         HandleError(req, res, error)
//     }
// }