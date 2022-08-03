const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new schema({
    date: { type: String, required: false },
    patientId: { type: ObjectId, ref: 'user' },
    appointmentId: { type: ObjectId, ref: 'bookAppointment' },
    breakFast: [{
        pre: { type: String, required: false },
        post: { type: String, required: false },
    }],
    lunch: [{
        pre: { type: String, required: false },
        post: { type: String, required: false },
    }],
    dinner: [{
        pre: { type: String, required: false },
        post: { type: String, required: false },
    }],
    others: { type: String, required: false },
},
    { timestamps: true }
)

module.exports = mongoose.model("sugarVitals", userSchema);