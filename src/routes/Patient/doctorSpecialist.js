var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    specialist,
    doctorList,
    doctorDetails,
    searchSpecialist
} = require("../../controller/Patient/doctorSpecialist");


router.get(
    "/user/specialist/:user_id",
    user_Middleware,
    specialist
);


router.get(
    "/user/doctorList/:user_id/:specialistId",
    user_Middleware,
    doctorList
);

router.get(
    "/user/doctorDetails/:user_id/:doctorId",
    user_Middleware,
    doctorDetails
);

router.post(
    "/user/searchSpecialist/:user_id",
    user_Middleware,
    searchSpecialist
);


module.exports = router;
