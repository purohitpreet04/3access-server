import mongoose from 'mongoose'

const OtpSchema = new mongoose.Schema({
    email: { type: String, default: '' },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'addedByModel'
    },
    // addedByModel: {
    //     type: String,
    //     required: true,
    //     enum: ['User', 'Staff']
    // },
    otp: { type: String, default: '' },
    otpExpiration: { type: Date, default: undefined },
})

const OtpModal = mongoose?.model('otp', OtpSchema)
export default OtpModal