var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");

const {
    addInsulinVitals,
    InsulinVitalsList,
    InsulinVitalsDetails,
    deleteInsulinVitals,
    editInsulinVitals
} = require("../../controller/Patient/insulinVitals");

router.post(
    "/user/addInsulinVitals/:user_id",
    user_Middleware,
    addInsulinVitals,
);

router.get(
    "/user/insulinVitalsList/:user_id/:appointmentId",
    user_Middleware,
    InsulinVitalsList
);

router.get(
    "/user/insulinVitalsDetails/:user_id/:vitalsId",
    user_Middleware,
    InsulinVitalsDetails
);

router.delete(
    "/user/deleteInsulinVital/:user_id/:vitalsId",
    user_Middleware,
    deleteInsulinVitals
);

router.put(
    "/user/editInsulinVital/:user_id/:vitalsId",
    user_Middleware,
    editInsulinVitals
);


module.exports = router;
