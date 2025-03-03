import mongoose from 'mongoose';
mongoose.set('strictPopulate', false);
// Define the staff schema
const staffSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true, // You can set required to true if this field is mandatory
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male',
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    match: /.+\@.+\..+/
  },
  role: {
    type: String,
    enum: ['company-agent', 'staff'],
    required: true,
  },
  permission: {
    type: Array,
    default: []
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  coruspondingEmail: {
    type: String,
    required: true,
  },
  status: { type: Number, default: 0 },
  unavailabilityStatus: {
    type: String,
    enum: ['active', 'holiday', 'ill', 'fired'],
    default: 'active'
  },
  unavailablefrom: { type: Date, default: Date.now },
  unavailableto: { type: Date, default: Date.now },
  unavailabilityReason: { type: String, default: '' },
  reassignedTasks: [{
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    reassignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    date: { type: Date, default: Date.now },
  }],
  otp: {
    type: Number,
    default: 0
  },
  otpExpiration: { type: Date, default: undefined },

}, { timestamps: true });

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
