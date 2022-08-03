const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('fullName')
        .notEmpty()
        .withMessage('fullName is required'),
    check('mobileNumber')
        .isLength({ min: 10 })
        .withMessage('Phone Number must be at least 10 character long'),
];

exports.validateSigninRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(200).json({ status: 400, message: errors.array()[0].msg })
    }
    next();
}

exports.studentVarifyRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
];

