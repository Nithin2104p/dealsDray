const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

// Define your JWT secret key here
const jwtSecretKey = "your_jwt_secret_key_here";

router.post('/registerUser', async (req, res) => {
    try {
        let checkUser = await User.findOne({ email: req.body.email });
        if (checkUser) {
            console.log("exist");
            return res.json({
                msg: "user already exist",
            });
        }
        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();

        return res.json({
            msg: "User created",
            data: user.name
        });
    } catch (error) {
        return res.status(400).send({
            message: "user not created",
        });
    }
});

router.post('/auth', async (req, res) => {
    try {
        let checkUser = await User.findOne({ email: req.body.email });
        if (!checkUser) {
            return res.status(400).json({
                msg: "user don't exist",
            });
        }

        let checkPass = await bcrypt.compare(req.body.password, checkUser.password);
        if (!checkPass) {
            return res.status(401).json({
                msg: "incorrect password"
            });
        }

        let token = jwt.sign({ _id: checkUser._id, name: checkUser.name }, jwtSecretKey);

        return res.status(200).send({
            loggedIn: true,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
});

router.post('/google/auth', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            let newUser = new User({
                email: req.body.email,
                googleId: req.body.googleId,
                avatar: req.body.imageUrl,
                password: "abc" // Do not store actual password for Google authenticated users
            });
            await newUser.save();
            let token = jwt.sign({ _id: newUser.googleId, name: newUser.name }, jwtSecretKey);
            return res.status(200).send(token);
        } else {
            user.googleId = req.body.googleId;
            user.avatar = req.body.imageUrl;
            await user.save();
            let token = jwt.sign({ _id: user.googleId, name: user.name }, jwtSecretKey);
            return res.status(200).send(token);
        }
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
});

module.exports = router;
