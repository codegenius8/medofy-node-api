const utils = require("../../utils");
const Prescription = require("../../model/Admin/prescription");
const Appointment = require("../../model/Pataint/bookAppointment");

exports.addPrescription = async (req, res) => {
    const { doctorId, patientid, appointmentId, vitals, Complaints, Diagnosis, Rx, advice, testRequired } =
        req.body;
    // const data = await Specialist.findOne({ name: name })
    // if (data) {
    //     return res.send(utils.createError("specialist is already exists.."));
    // }
    // else {
    const Users = new Prescription({
        doctorId: doctorId,
        patientid: patientid,
        appointmentId: appointmentId,
        vitals: vitals,
        Complaints: Complaints,
        Diagnosis: Diagnosis,
        Rx: Rx,
        advice: advice,
        testRequired: testRequired
    });
    const datas = await Users.save(async (err, data) => {

        if (data) {
            const dataRes = await Appointment.findOneAndUpdate(
                { _id: appointmentId, },
                { $push: { prescriptions: data._id } },
                { new: true }
            );

        }
        if (err) return res.send(utils.createError("Database error"));
        else {
            res.send(
                utils.createResult(err, "Add Prescription Successfully", data)
            );
        }
    });
    // }
};

exports.PrescriptionList = async (req, res) => {
    const data = await Appointment.findOne({ _id: req.params.appointmentId })
        .populate('doctorId', 'fullName image', 'doctor')
        .populate('prescriptions')
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "prescription List Successfully", userDB));
        });
};