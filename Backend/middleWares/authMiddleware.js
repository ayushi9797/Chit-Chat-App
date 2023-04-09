const jwt = require("jsonwebtoken");
const asynchandler = require('express-async-handler');
const { User } = require('../models/userModel');

const auth = asynchandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // decode the users id from token
            const decoded = jwt.verify(token, process.env.key);

            // find the user by id
            req.user = await User.findById(decoded.id).select("-password");
            next()

        } catch (error) {
            res.status(401);
            throw new Error("Not authorised,Please Login First")
        }
    }
    if (!token) {
            res.status(401);
            throw new Error("Not authorised,Token Not Found")
    }
})
module.exports={auth}