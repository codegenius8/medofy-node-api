var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");
const upload = require("../../../handler/multer")

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    labReport
} = require("../../controller/Admin/labReport");

router.post("/admin/uploadLabReport",
    upload.fields([
        { name: "reportPdf", maxCount: 1 },
        { name: "reportImage", maxCount: 1 },
    ]), labReport);

module.exports = router;
