import mongoose from 'mongoose';
mongoose.set('strictPopulate', false);
const propertySchema = new mongoose.Schema({
    visibleTo: [mongoose.Schema.Types.ObjectId],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'addedByModel' // Dynamic reference based on `addedByModel`
    },
    addedByModel: {
        type: String,
        required: true,
        enum: ['User', 'Staff']  // Only allow "User" or "Staff" as values
    },
    councilTaxPayer: {
        type: Number,
        // required: true
    },
    rslTypeGroup: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rsl'
    },
    address: {
        type: String,
        required: true,
        maxlength: 100
    },
    fullAddress: {
        type: String,
        default:''
    },
    bedrooms: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postCode: {
        type: String,
        required: true
    },
    basicRent: {
        type: Number,
        required: true
    },
    serviceCharges: {
        type: Number,
        required: true
    },
    eligibleRent: {
        type: Number,
        required: true
    },
    ineligibleCharge: {
        type: Number,
        required: true
    },
    sharedWithOther: {
        type: String,
        required: true
    },
    otherInformation: {
        type: Boolean,
        default: false
    },
    bedist: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    selfContainedFlat: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    quantityOfFloors: {
        type: Number,
        default: 1
    },
    unfurnished: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    partFurnished: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    fullyFurnished: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    centralHeating: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    garden: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    garageParkingSpace: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes'
    },
    accommodationLocation: {
        type: String,
        default: ''
    },
    accommodationFloor: {
        type: String,
        default: ''
    },
    totalLivingRooms: {
        yourUse: {
            type: String,
            default: 0
        },
        communal: {
            type: Number,
            default: 0
        },
    },
    totalBedsitRooms: {
        communal: {
            type: Number,
            default: 0
        },
        yourUse: {
            type: String,
            default: ''
        }
    },
    totalBedrooms: {
        communal: {
            type: Number,
            default: 0
        },
        yourUse: {
            type: String,
            default: ''
        }
    },
    totalBathrooms: {
        communal: {
            type: Number,
            default: 0
        },
        yourUse: {
            type: String,
            default: ''
        }
    },
    totalToilets: {
        communal: {
            type: Number,
            default: 0
        },
        yourUse: {
            type: String,
            default: ''
        }
    },
    totalKitchens: {
        communal: {
            type: Number,
            default: 0
        },
        yourUse: {
            type: String,
            default: ''
        }
    },
    totalOtherRooms: {
        communal: {
            type: Number,
            default: 0
        },
        yourUse: {
            type: String,
            default: ''
        }
    },

    tenants: [{
        tenant_id: { type: mongoose.Types.ObjectId, ref: 'Tenants' },
        roomNo: { type: Number },
        signInDate: { type: Date },
        endDate: { type: Date },
        lastsignoutdate: { type: Date }
    }],
    status: { type: Number, default: 0 },
    isDeleted: { type: Number, default: 0 },
}, { timestamps: true });
const Property = mongoose.model('properties', propertySchema);

export default Property;
