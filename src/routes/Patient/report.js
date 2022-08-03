var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");
const upload = require("../../../handler/multer")

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    uploadReport,
    reportList,
    deleteReport,
    labReportList
} = require("../../controller/Patient/report");

router.post("/user/uploadReport/:user_id",
    upload.fields([
        { name: "reportPdf", maxCount: 1 },
        { name: "reportImage", maxCount: 1 },
    ]),
    user_Middleware, uploadReport);

router.get("/user/reportList/:user_id",
    user_Middleware, reportList);

router.delete("/user/deleteReport/:user_id/:reportId",
    user_Middleware, deleteReport);

router.get("/user/labReportList/:user_id",
    user_Middleware, labReportList);

module.exports = router;
