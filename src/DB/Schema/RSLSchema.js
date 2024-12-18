import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.set('strictPopulate', false);
const rslSchema = new mongoose.Schema({
    rslLogo: {
        type: String,
        default: ''
    },
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
    emailto: { type: String, default: '' },
    emailcc: { type: String, default: '' },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    visibleTo: [mongoose.Schema.Types.ObjectId],
    status: { type: Number, default: 0 }
}, {
    timestamps: true,
});

rslSchema.methods.hasStaffOrAgent = function () {
    return this.staff.length > 0 || this.companyagent.length > 0;
};

const RSL = mongoose.model('rsl', rslSchema);
export default RSL;
