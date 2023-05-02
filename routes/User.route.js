const express = require("express");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/User.model");

userRouter.post("/register", async (req, res) => {
    const {name, email, gender, password} = req.body;
    
    try {
        bcrypt.hash(password, 5, async (err, hashPassword) => {
            // console.log(name, email, gender, hashPassword);
            const user = new UserModel({name, email, gender, password: hashPassword});
            await user.save();
        });

        res.status(200).send({"msg": "User Created"});
    }
    catch(err) {
        res.status(400).send({"err": err.message});
    }
});


userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email});
        // console.log(user);

        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (result) {
                    const token = jwt.sign({ author: user.name, authorId: user._id }, "someRandomSecretKey");
                    res.status(200).send({"msg": "Logger-in Successfully", "token": token});
                }
                else {
                    res.status(200).send({"msg": "Invalid Credentials"});
                }
            });
        }
        else {
            res.status(200).send({"msg": "Invalid Credentials"});
        }
    }
    catch(err) {
        res.status(400).send({"err": err.message});
    }
});

module.exports = {
    userRouter
}
