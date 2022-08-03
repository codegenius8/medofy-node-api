var express = require("express");
var router = express.Router();

const { user_Middleware } = require("../../../middleware/user_middleware");

const {
    validateSignupRequest,
    isRequestValidated,
} = require("../../../validators/auth");
const {
    addSpecialist,
    deleteSpecialist,
    updateSpecialist,
    getAllSpecialist,
    getSpecialistById
} = require("../../controller/Admin/specialist");

router.post(
    "/admin/addSpecialist",
    addSpecialist
);

router.delete(
    "/admin/deleteSpecialist/:specialist_id",
    deleteSpecialist
);
router.patch(
    "/admin/updateSpecialist/:specialist_id",
    updateSpecialist
);

router.get(
    "/admin/getSpecialistById/:specialist_id",
    getSpecialistById
);

router.get(
    "/admin/getAllSpecialist",
    getAllSpecialist
);


module.exports = router;
