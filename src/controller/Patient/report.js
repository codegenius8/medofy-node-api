const Report = require("../../model/Pataint/reports");
const LabReport = require("../../model/Admin/labReport");
const utils = require("../../utils");

exports.uploadReport = async (req, res) => {

    const { type } = req.body;
    const user = new Report();
    // user.doctorId = doctorId;
    user.addedBy = req.params.user_id;
    if (type === 'pdf') {
        user.reportPdf = "/report/" + req.files.reportPdf[0].filename;
        user.type = type;
    }

    if (type === 'image') {
        user.reportImage = "/report/" + req.files.reportImage[0].filename;
        user.type = type;
    }
    const datas = await user.save(async (err, data) => {
        console.log(err);
        if (err) return res.send(utils.createError("Database error"));
        else {
            res.send(
                utils.createResult(err, "Report Uploaded Successfully", data)
            );
        }
    });
};

exports.reportList = async (req, res) => {
    const data = await Report.find({ addedBy: req.params.user_id })
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "Report List Successfully", userDB));
        });
}


exports.deleteReport = async (req, res) => {
    const data = await Report.deleteOne({ _id: req.params.reportId })
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "Report Deleted Successfully"));
        });
}


exports.labReportList = async (req, res) => {
    const data = await LabReport.find({ patientId: req.params.user_id })
        .exec((err, userDB) => {
            if (err) return res.send(utils.createError("Database Eror."));
            res.send(utils.createResult(err, "Lab Report List Successfully", userDB));
        });
}
