var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    addPrescription,
    PrescriptionList
} = require("../../controller/Admin/prescription");

router.post(
    "/admin/addPrescription",
    addPrescription
);

router.get(
    "/user/PrescriptionList/:user_id/:appointmentId",
    user_Middleware,
    PrescriptionList
);

module.exports = router;
