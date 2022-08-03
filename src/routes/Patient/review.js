var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    submitReview,
    reviewList
} = require("../../controller/Patient/review");


router.post(
    "/user/submitReview/:user_id",
    user_Middleware,
    submitReview
);


router.get(
    "/user/reviewList/:user_id/:doctorId",
    user_Middleware,
    reviewList
);


module.exports = router;
