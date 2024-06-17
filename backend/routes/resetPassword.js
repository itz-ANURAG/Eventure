var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt =require('bcrypt')
const UserModel=require('../Models/userData');
const jwt = require('jsonwebtoken')
require("dotenv").config();



/* GET users listing. */
router.post('/',async (req, res) => {
    console.log(req.body);
    const {password ,token} = req.body;
    const decode = jwt.verify(token , process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({success:false,massage:"Your email not registered with us"});
    }
    try {
        const hashedPassword =await bcrypt.hash(password,10)
        const user = await UserModel.findOneAndUpdate(
            { _id: decode.id}, // Query to find the user by username
            { password: hashedPassword }, // Update to set the hashed password
            { new: true } // Option to return the updated document
          );
        if(!user){
            return res.status(403).json({success:false , massage:"User not found enter valid email"})
        }
       return  res.status(200).json({success:true , massage:"Reset Password Successfully"});
    } catch (error) {
        console.log(error);
       return res.status(403).json({success:false,massage:"Something Went Wrong while reseting password"});
    }
});

module.exports = router;
