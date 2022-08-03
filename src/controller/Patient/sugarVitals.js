const utils = require("../../utils");
const Vitals = require("../../model/Pataint/sugarVitals");
const Appointment = require("../../model/Pataint/bookAppointment");

exports.addSugarVitals = async (req, res) => {
    const { date, others, breakFast, lunch, dinner, appointmentId } =
        req.body;
    const Users = new Vitals({
        date: date,
        others: others,
        breakFast: breakFast,
        lunch: lunch,
        dinner: dinner,
        patientId: req.params.user_id,
        appointmentId: req.body.appointmentId
    });
    const datas = await Users.save(async (err, data) => {
        if (err) return res.send(utils.createError("Database error"));
        else {
            res.send(
                utils.createResult(err, "Sugar Vitals Added Successfully", data)
            );
        }
    });
};

exports.SugarVitalsList = async (req, res) => {
    const data = await Vitals.find({ patientId: req.params.user_id, appointmentId: req.params.appointmentId })
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "Sugar Vitals List Successfully", userDB));
        });
};

exports.SugarVitalsDetails = async (req, res) => {
    const data = await Vitals.findOne({ patientId: req.params.user_id, _id: req.params.vitalsId })
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "Sugar Vitals Details Successfully", userDB));
        });
};


exports.deleteSugarVitals = async (req, res) => {
    const vitalRes = await Vitals.findOne({ _id: req.params.vitalsId })
    if (vitalRes) {
        const data = await Vitals.deleteOne({ patientId: req.params.user_id, _id: req.params.vitalsId })
            .exec((err, userDB) => {
                if (err) return res.send(utils.createError("Database Eror."));
                res.send(utils.createResult(err, "Sugar Vitals deleted Successfully",));
            });
    } else {
        return res.send(utils.createError("Sugar Vitals Id not found",));
    }
};

exports.editSugarVitals = async (req, res) => {
    try {
        const { date, others, breakFast, lunch, dinner, appointmentId } = req.body;

        const { vitalsId } = req.params;
        if (!vitalsId) return res.send(utils.createError("Appointment id  is required."));
        Vitals.findOne(
            { _id: vitalsId },
            { deleted: 0, __v: 0, createdOn: 0 },
            async (err, userDB) => {
                if (err) return res.send(utils.createError("Database Eror."));
                if (!userDB) return res.send(utils.createError("data Not Found"));
                if (others) userDB.others = others;
                if (date) userDB.date = date;
                if (breakFast) userDB.breakFast = breakFast;
                if (lunch) userDB.lunch = lunch;
                if (dinner) userDB.dinner = dinner;
                if (appointmentId) userDB.appointmentId = appointmentId;
                userDB.save(async (error, data) => {
                    if (error) {
                        return res.send(utils.createError("database error"));
                    }
                    return res.send(
                        utils.createSuccess("Sugar Vitals Updated  successfully", data)
                    );
                });
            }
        );
    } catch (ex) {
        console.log(ex);
        res.send(utils.createError("some database error"));
    }

};