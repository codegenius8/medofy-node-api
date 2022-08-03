const mongoose = require('mongoose');
const doctorAvailability = require('./doctorAvailability');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    fullName: { type: 'string', required: false },
    birthDate: { type: String, required: false },
    gender: { type: String, required: false },
    mobileNumber: { type: 'string', required: false },
    email: { type: 'string', required: false },
    role: { type: String, enum: ["patient", "doctor"], },
    education: { type: String, required: false },
    specialist: { type: ObjectId, ref: "specialist" },
    image: { type: String, required: false },
    experience: { type: String, required: false },
    consultationfee: { type: String, required: false },
    address: { type: String, required: false },
    clinicName: { type: String, required: false },
    rating: { type: String, default: "0.0" },
    aboutDoctor: { type: String, required: false },
    doctorAvailability: [{
        date: { type: String, required: false },
        days: { type: String, required: false },
        time: { type: Array, required: false },
        isOpened: { type: Boolean, required: false }
    }]



},
    { timestamps: true }
)

module.exports = mongoose.model("doctor", userSchema);