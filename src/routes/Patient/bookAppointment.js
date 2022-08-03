var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    bookAppointment,
    myBookAppointmentList,
    cancelAppointment,
    reScheduleAppointment
} = require("../../controller/Patient/bookAppointment");


router.post(
    "/user/bookAppointment/:user_id",
    user_Middleware,
    bookAppointment
);

router.get(
    "/user/myBookAppointmentList/:user_id",
    user_Middleware,
    myBookAppointmentList
);

router.post(
    "/user/cancelAppointment/:user_id",
    user_Middleware,
    cancelAppointment
);

router.put(
    "/user/reScheduleAppointment/:user_id",
    user_Middleware,
    reScheduleAppointment
);


module.exports = router;
