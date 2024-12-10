import mongoose, { isObjectIdOrHexString } from "mongoose";
import { generateToken, HandleError } from "../Utils/CommonFunctions.js"
import bcrypt from 'bcryptjs';
import user from "../DB/Schema/userSchema.js";
import Staff from "../DB/Schema/StaffSchema.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).send({ message: 'Please provide email and password', severity: 'error' });
        }

        let User = await user.findOne({ email }).lean();

        let isStaff = false;
        let addedByData = null;

        if (!User) {
            User = await Staff.findOne({ email, status: 0 }).lean();
            isStaff = !!User;

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
                _id: addedByData._id,
                fname: addedByData.fname,
                lname: addedByData.lname,
                email: addedByData.email,
                role: addedByData.role,
                phonenumber: addedByData.phonenumber,

            };
        }
        res.status(200).json(responseData);
    } catch (error) {
        // console.log(error)
        HandleError(req, res, error)
    }
}


export const registerUser = async (req, res) => {
    try {
        const {
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

        // 1. Validate required fields
        if (!fname || !lname || !email || !password || !phonenumber || !address || !city) {
            return res.status(400).json({ error: 'All required fields must be provided', severity: 'error', success: false });
        }

        // 2. Check if the user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists with this email', severity: 'error', success: false, page: 1 });
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create the new user
        const newUser = new user({
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
        });

        // 5. Save the user to the database
        await newUser.save();

        // 6. Generate JWT token for the new user
        const token = generateToken(newUser._id);

        // 7. Return success response with token and user details
        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                _id: newUser._id,
                fname: newUser.fname,
                lname: newUser.lname,
                email: newUser.email,
                companyname: newUser.companyname,
                role: newUser.role,
            },
            severity: 'success', success: true
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error', severity: 'error', success: false });
    }
}

export const fetchUserDetails = async (req, res) => {
    try {
        const userId = req.headers['user']
        if (!isObjectIdOrHexString(userId)) {
            return res.status(401).send({ message: 'User data is not valid', severity: 'error' });
        }

        const User = await user.findById({ "_id": userId }, { password: 0 }).lean()

        if (!User) {
            return res.status(401).send({ message: 'User Not Found!', severity: 'error' });
        }
        res.status(200).json({
            success: true,
            user: User,
        });

    } catch (error) {
        HandleError(req, res, error)
    }
}