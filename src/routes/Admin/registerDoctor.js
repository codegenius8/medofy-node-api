var express = require("express");
var router = express.Router();

const upload = require("../../../handler/multer")
const { user_Middleware } = require("../../../middleware/user_middleware");

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const { registerDoctor, doctorAvailablity } = require("../../controller/Admin/registerDoctor");


router.post(
    "/admin/registerDoctor",
    upload.single("image"),
    registerDoctor
);

router.post(
    "/admin/doctorAvailablity",
    doctorAvailablity
);


module.exports = router;


