var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    addSugarVitals,
    SugarVitalsList,
    SugarVitalsDetails,
    deleteSugarVitals,
    editSugarVitals

} = require("../../controller/Patient/sugarVitals");

router.post(
    "/user/addSugarVitals/:user_id",
    user_Middleware,
    addSugarVitals,
);

router.get(
    "/user/SugarVitalsList/:user_id/:appointmentId",
    user_Middleware,
    SugarVitalsList
);

router.get(
    "/user/SugarVitalsDetails/:user_id/:vitalsId",
    user_Middleware,
    SugarVitalsDetails
);

router.delete(
    "/user/deleteSugarVital/:user_id/:vitalsId",
    user_Middleware,
    deleteSugarVitals
);

router.delete(
    "/user/deleteSugarVital/:user_id/:vitalsId",
    user_Middleware,
    deleteSugarVitals
);

router.put(
    "/user/editSugarVital/:user_id/:vitalsId",
    user_Middleware,
    editSugarVitals
);


module.exports = router;
