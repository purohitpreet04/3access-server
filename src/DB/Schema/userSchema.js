import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.set('strictPopulate', false);
const userSchema = new mongoose.Schema({
    staff: [mongoose.Schema.Types.ObjectId],
    companyagent: [mongoose.Schema.Types.ObjectId],
    fname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[A-Za-z]+$/,
    },
    lname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        match: /^[A-Za-z]+$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        // required: true,
        minlength: 8,
        maxlength: 128,
    },
    companyname: {
        type: String,
        maxlength: 100,
    },
    address: {
        type: String,
        required: true,
        maxlength: 200,
    },
    area: {
        type: String,
        required: true,
        maxlength: 50,
    },
    city: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/,
    },
    pincode: {
        type: String,
        required: true,
        // match: /^\d{6}$/,
    },
    phonenumber: {
        type: String,
        required: true,
        // match: /^\d{10}$/,
    },
    website: {
        type: String,
        // match: /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/,
    },
    role: {
        type: String,
        require: true
    },
    selectedData: { type: String },
    permission: { type: Array, default: [] },
    emailto: { type: String, default: '' },
    emailcc: { type: String, default: '' },
    isMainMA: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    otp: {
        type: Number,
        default: undefined
    },
    verificationTokenExpires: { type: Date, default: undefined },
    verificationToken: { type: String, default: undefined},
    coruspondingEmail: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }

}, {
    timestamps: true,
});

userSchema.methods.hasStaffOrAgent = function () {
    return this.staff.length > 0 || this.companyagent.length > 0;
};

const user = mongoose.model('User', userSchema);
export default user; 
