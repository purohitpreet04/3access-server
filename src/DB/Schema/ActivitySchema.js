import mongoose from 'mongoose';

const actionLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, refPath: 'addedByModel' },
    addedByModel: {
        type: String,
        required: true,
        enum: ['User', 'Staff']  // Only allow "User" or "Staff" as values
    },
    actionType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    affectedData: { type: mongoose.Schema.Types.Mixed },
    entityType: { type: String, required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const ActionLog = mongoose.model('ActionLog', actionLogSchema);
export default ActionLog;
