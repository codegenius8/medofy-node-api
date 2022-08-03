const BookAppointment = require("../../model/Pataint/bookAppointment");
const utils = require("../../utils");

exports.bookAppointment = async (req, res) => {
    const {
        time, date, doctorId, paymentMode, consultationfee, patientName, gender, age, day, bookingConfirmed,
    } = req.body;

    const user = new BookAppointment();
    user.doctorId = doctorId;
    user.time = time;
    user.date = date;
    user.paymentMode = paymentMode;
    user.consultationfee = consultationfee;
    user.patientName = patientName;
    user.gender = gender;
    user.age = age;
    user.day = day;
    user.bookingConfirmed = true;
    user.addedBy = req.params.user_id;
    const datas = await user.save(async (err, data) => {
        console.log(err);
        if (err) return res.send(utils.createError("Database error"));
        else {
            res.send(
                utils.createResult(err, "Appointment Booked Successfully", data)
            );
        }
    });
};


exports.myBookAppointmentList = async (req, res) => {
    const data = await BookAppointment.find({ addedBy: req.params.user_id })
        // .populate('doctorId', 'fullName image specialist', 'doctor')
        .populate({
            path: "doctorId",
            select: "specialist fullName image",
            populate: {
                path: "specialist",
                model: "specialist",
                select: "name",
            },
        })
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "my Appointment List Successfully", userDB));
        });
}

exports.cancelAppointment = async (req, res) => {

    const { isCancelled, reason, appointmentId } = req.body;
    await BookAppointment.findOneAndUpdate({ _id: appointmentId },
        { $set: { isCancelled: isCancelled, reason: reason } },
        { new: true })
        .exec((err, userDB) => {
            console.log(userDB)
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "Appointment Cancel Successfully", userDB));
        });
}

exports.reScheduleAppointment = async (req, res) => {
    
    try {
        const { appointmentId, time, date, day } = req.body;
        if (!appointmentId) return res.send(utils.createError("Appointment id  is required."));
        BookAppointment.findOne(
            { _id: appointmentId },
            { deleted: 0, __v: 0, createdOn: 0 },
            async (err, userDB) => {
                if (err) return res.send(utils.createError("Database Eror."));
                if (!userDB) return res.send(utils.createError("Appointment Not Found"));
                if (time) userDB.time = time;
                if (date) userDB.date = date;
                if (day) userDB.day = day;
                userDB.save(async (error, data) => {
                    if (error) {
                        return res.send(utils.createError("database error"));
                    }
                    return res.send(
                        utils.createSuccess("Appointment Reschedule successfully", data)
                    );
                });
            }
        );
    } catch (ex) {
        console.log(ex);
        res.send(utils.createError("some database error"));
    }
};