import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    subject: { type: String,  },
    body: { type: String, },
    attachments: { type: String }, // Array of attachment paths/URLs
    emailCC:{ type: String,  },
    emailTo:{ type: String,  },
}, { timestamps: true });

export const EmailLog = mongoose.model('EmailLog', emailLogSchema);
