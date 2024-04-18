const jwtSecretKey = "your_jwt_secret_key_here"; // Replace with your actual JWT secret key

const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    authToken: async (req, res, next) => {
        let token = req.header("x-auth-token");
        if (!token) return res.status(400).json("Token is not provided");

        try {
            let verify = jwt.verify(token, jwtSecretKey);
            if (verify) {
                req.user = await User.findById(verify._id);
            }
            next();
        } catch (error) {
            return res.status(401).json("Invalid token");
        }
    }
}
