const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    fullName: { type: 'string', required: false },
    image: { type: String, required: false },
    birthDate: { type: String, required: false },
    gender: { type: String, required: false },
    mobileNumber: { type: 'string', required: false },
    isEmailVarified: { type: 'boolean', default: false },
    email: { type: 'string', required: false },
    password: { type: 'string', required: false },
    location: {
        type: { type: String, default: "Point", }, coordinates: { type: [Number], index: "2dsphere" },
    },
    deviceToken: { type: 'string', default: "" },
    otp: { type: 'string', default: "" },
    otpVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["patient", "doctor"], default: "patient" },

},
    { timestamps: true }
)

module.exports = mongoose.model("user", userSchema);