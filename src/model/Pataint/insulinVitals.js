const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    date: { type: String, required: false },
    patientId: { type: ObjectId, ref: 'user' },
    appointmentId: { type: ObjectId, ref: 'bookAppointment' },
    insulin: [{
        brand: { type: String, required: false },
        dosage: { type: String, required: false },
    }],
},
    { timestamps: true }
)

module.exports = mongoose.model("InsulinVitals", userSchema);