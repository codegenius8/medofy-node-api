const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            if (file.fieldname === "image") {
                cb(
                    null,
                    path.join(path.dirname(__dirname), "./public/uploads/profile/")
                );
            }else{
                cb(
                    null,
                    path.join(path.dirname(__dirname), "./public/uploads/report/")
                );

            }
        } catch (e) {
            cb(e);
        }
    },
    filename: function (req, file, cb) {
        console.log(file);
        try {
            let a = file.originalname.split(".");
            cb(null, Date.now() + file.originalname);
        } catch (e) {
            cb(e);
        }
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".gif" &&
            ext !== ".jpeg" &&
            ext !== ".webp" &&
            ext !== ".pdf"
        ) {
            return callback("Only png, jpg, gif and jpeg Images are allowed!");
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
});

module.exports = upload;
