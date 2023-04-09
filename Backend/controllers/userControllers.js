const asynchandler = require('express-async-handler');
const { User } = require('../models/userModel')
const {generateToken}=require("../config/generateToken")

// get all users and regex
// ap/user?search=value eg.Dilip
const allUsers = asynchandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  // search result will be the users other than current loggeg in user
  res.send(users);
});


const registerUser = asynchandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter the all fields")
    }
    const userExists = await User.findOne({ email });
    // check the user exists
    if (userExists) {
        res.status(400);
        throw new Error("User allready exists");
    }

    // else

    const user = await User.create({
        name,
        email,
        password,
        pic,
        
    });
    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Failed to create the user")
    }
});
const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});


module.exports={registerUser,allUsers,authUser}