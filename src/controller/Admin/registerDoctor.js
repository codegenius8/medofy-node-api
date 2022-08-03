const Doctor = require("../../model/Admin/doctor");
const utils = require("../../utils");

exports.registerDoctor = async (req, res) => {
    const {
        fullName,
        birthDate,
        gender,
        email,
        mobileNumber,
        education,
        specialist,
        experience,
        address,
        clinicName,
        rating,
        consultationfee,
        aboutDoctor
    } = req.body;

    const doctor = await Doctor.findOne({ email: email })
    if (doctor) {
        return res.send(utils.createError("doctor already registered"));
    } else {
        const user = new Doctor();
        user.fullName = fullName;
        user.birthDate = birthDate;
        user.gender = gender;
        user.email = email;
        user.mobileNumber = mobileNumber;
        user.education = education;
        user.specialist = specialist;
        user.experience = experience;
        user.address = address;
        user.clinicName = clinicName;
        user.rating = rating;
        user.consultationfee = consultationfee;
        user.aboutDoctor = aboutDoctor;
        user.role = "doctor";
        if (req.file.originalname) {
            user.image = "/profile/" + req.file.filename;
        }
        const datas = await user.save(async (err, data) => {
            console.log(err);
            if (err) return res.send(utils.createError("Database error"));
            else {
                res.send(
                    utils.createResult(err, "Doctor Register Successfully", data)
                );
            }
        });
    }
};

exports.doctorAvailablity = async (req, res) => {
    const { doctorAvailability, doctorId } = req.body;
    const data = await Doctor.findOneAndUpdate({ _id: doctorId }, { $set: { doctorAvailability: doctorAvailability }, }, { new: true })
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "Doctor Availablity Added Successfully", userDB));
        });
}