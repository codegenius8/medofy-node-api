const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const prescriptionSchema = new schema({
    patientid: { type: ObjectId, required: false },
    appointmentId: { type: ObjectId, required: false },
    doctorId: { type: ObjectId, required: false },
    vitals: [{
        height: { type: String, required: false },
        weight: { type: String, required: false },
        pulse: { type: String, required: false },
        Bp: { type: String, required: false },
        temperature: { type: String, required: false }
    }],
    Complaints: [{
        complaint: { type: String, required: false },
        frequency: { type: String, required: false },
        severity: { type: String, required: false },
        duration: { type: String, required: false },
        date: { type: String, required: false },
    }],
    Diagnosis: [{
        diagnosis: { type: String, required: false },
        duration: { type: String, required: false },
        date: { type: String, required: false },
    }],
    Rx: [{
        medicine: { type: String, required: false },
        dose: { type: String, required: false },
        when: { type: String, required: false },
        frequency: { type: String, required: false },
        duration: { type: String, required: false },
        notes: { type: String, required: false },
    }],
    advice: { type: String, required: false },
    testRequired: [{ testName: { type: String, required: false } }],


},
    { timestamps: true }
)

module.exports = mongoose.model("prescription", prescriptionSchema);