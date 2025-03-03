import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    whose: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDate: Date,
});

export default mongoose.model('Task', taskSchema);