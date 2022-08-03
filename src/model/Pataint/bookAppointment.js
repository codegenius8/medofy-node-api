const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const appointmentSchema = new schema({
    time: { type: String, required: false },
    date: { type: String, required: false },
    addedBy: { type: ObjectId, ref: 'user' },
    doctorId: { type: ObjectId, ref: 'doctor' },
    paymentMode: { type: String, required: false },
    consultationfee: { type: String, required: false },
    patientName: { type: String, required: false },
    gender: { type: String, required: false },
    age: { type: String, required: false },
    isPaid: { type: Boolean, default: false },
    day: { type: String, required: false },
    isCancelled: { type: Boolean, default: false },
    reason: { type: String, required: false },
    bookingConfirmed: { type: Boolean, required: false },
    prescriptions: [
        {
            type: ObjectId,
            ref: "prescription",
        },
    ],
},
    { timestamps: true }
)

module.exports = mongoose.model("bookAppointment", appointmentSchema);