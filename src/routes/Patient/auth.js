var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");
const upload = require("../../../handler/multer")

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    signInWithOtp,
    varifyOtp,
    addEmail,
    emailVarifyOtp,
    setPassword,
    login,
    updateLocation,
    forgotPassword,
    forgotPasswordOtpVarified,
    change_password,
    editProfile,
    profileDetail
} = require("../../controller/Patient/auth");

router.post(
    "/user/login_with_otp",
    validateSignupRequest,
    isRequestValidated,
    signInWithOtp
);

router.post(
    "/user/varifyOtp",
    varifyOtp
);

router.post(
    "/user/addEmail/:user_id",
    user_Middleware,
    addEmail
);

router.post(
    "/user/emailVarifyOtp",
    emailVarifyOtp
);

router.post(
    "/user/setPassword/:user_id",
    user_Middleware,
    setPassword
);


router.post(
    "/user/logIn",
    login
);
router.post(
    "/user/updateLocation/:user_id",
    user_Middleware,
    updateLocation
);

router.post(
    "/user/forgotPassword",
    forgotPassword
);

router.post(
    "/user/forgotPasswordOtpVarified",
    forgotPasswordOtpVarified
);

router.post("/user/resetPassword", change_password);

router.put("/user/editProfile/:user_id",
    upload.single("image"),
    user_Middleware, editProfile);

router.get("/user/profileDetail/:user_id",
    user_Middleware, profileDetail);

module.exports = router;
