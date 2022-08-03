const jwt = require('jsonwebtoken')

exports.user_Middleware = (req, res, next) => {
    var Token = req.headers["authorization"]
    const bearer = Token.split(' ');
    const bearerToken = bearer[1];
    if (typeof bearerToken !== "undefined") {
        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, userData) => {
            if (err) {
                res.status(403).send({ status: 400, message: 'Unauthorized: invalid token' })
            } else {
                if (userData._id == req.params.user_id) {
                    next()
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        res.sendStatus(403);
    }
};