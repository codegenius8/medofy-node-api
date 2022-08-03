const Review = require("../../model/Pataint/review");
const utils = require("../../utils");

exports.submitReview = async (req, res) => {
    const {
        doctorId,
        rating,
        review,
    } = req.body;

    const user = new Review();
    user.doctorId = doctorId;
    user.review = review;
    user.addedBy = req.params.user_id;
    user.rating = rating;
    const datas = await user.save(async (err, data) => {
        console.log(err);
        if (err) return res.send(utils.createError("Database error"));
        else {
            res.send(
                utils.createResult(err, "Review Submitted Successfully", data)
            );
        }
    });
};

exports.reviewList = async (req, res) => {
    const data = await Review.find({doctorId: req.params.doctorId})
    .populate('addedBy', "fullName image", "user")
    .exec((err, userDB) => {
        if (err) return res.send(utils.createError("Database Eror."));
        res.send(utils.createResult(err, "Review List Successfully", userDB));
    });
};

