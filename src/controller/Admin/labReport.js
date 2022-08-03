const Report = require("../../model/Admin/labReport");
const utils = require("../../utils");

exports.labReport = async (req, res) => {

    const { type, doctorId, patientId } = req.body;
    const user = new Report();
    user.doctorId = doctorId;
    user.patientId = patientId;
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
                utils.createResult(err, "Lab Report Uploaded Successfully", data)
            );
        }
    });
};
