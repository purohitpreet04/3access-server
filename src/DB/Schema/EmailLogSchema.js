import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    attachments: { type: String }, // Array of attachment paths/URLs
    emailCC:{ type: String, required: true },
    emailTo:{ type: String, required: true },
}, { timestamps: true });

export const EmailLog = mongoose.model('EmailLog', emailLogSchema);
