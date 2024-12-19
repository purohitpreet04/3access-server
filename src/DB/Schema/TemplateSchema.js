import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'User' },
    rsl: { type: mongoose.Schema.Types.ObjectId, refPath: 'rsl' },
    subject: { type: String, default:'' },
    body: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });

const Template = mongoose.model('Template', TemplateSchema);
export default Template;
