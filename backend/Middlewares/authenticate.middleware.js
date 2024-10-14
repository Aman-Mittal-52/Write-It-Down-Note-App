const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.status(403).json({ message: "Token is not valid", error: err })
            }
            req.user = decoded;
            next();
        })
    } catch (error) {
        return res.status(500).json({ Message: "Internal Server", error: error })
    }
}

module.exports = authenticate;