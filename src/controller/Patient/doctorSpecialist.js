const utils = require("../../utils");
const Specialist = require("../../model/Admin/specialist");
const Doctor = require("../../model/Admin/doctor");

exports.specialist = async (req, res) => {
    const data = await Specialist.find({}).exec((err, userDB) => {
        if (err) return res.send(utils.createError("Database Eror."));
        res.send(utils.createResult(err, "specialist List Successfully", userDB));
    });
};

exports.doctorList = async (req, res) => {
    
    const data = await Doctor.find({ specialist: req.params.specialistId, role: 'doctor' })
        .populate('specialist', 'name', 'specialist')
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "specialist List Successfully", userDB));
        });
};

exports.doctorDetails = async (req, res) => {
    const data = await Doctor.findOne({ _id: req.params.doctorId, role: 'doctor' })
        //.select('fullName gender mobileNumber education image specialist experience consultationfee address clinicName rating')
        .populate('specialist', 'name', 'specialist')
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "Doctor Details Successfully", userDB));
        });
}

exports.searchSpecialist = async (req, res) => {
    const options = {
        name: {
            $regex: ".*" + req.body.name + ".*",
            $options: "i",
        }
    };
    const user = await Specialist.find(options)
    if (user) {
        res.json({
            message: "Search Speciality successfully ",
            status: 200,
            data: user,
        });
    } else {
        return res.status(200).json({
            status: 400,
            message: "Speciality not found",
        })
    }
}