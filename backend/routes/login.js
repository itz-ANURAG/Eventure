var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt =require('bcrypt')
const UserModel=require('../Models/userData');
const jwt = require('jsonwebtoken')
require("dotenv").config();

/* GET users listing. */
router.post('/login',async (req, res) => {
    try{
         const {
            username,
            password
         }=req.body;
    console.log("login page")
    // console.log(req.body)
    const user = await UserModel.findOne({username});
    if(!user){
              return res.status(304).json({
                success:false,
                message:"U have not signed up previously to our website",
                path:"Signin"
              });
        }
    
    const validPassword = bcrypt.compare(password,user.password);
    if(!validPassword){
        console.log("wrong Password")
        return res.status(200).json({
            success:false,
            message:"wrong user password plz enter valid password"
        })
    }
    // console.log(user)
    const token = jwt.sign({
        username:user.username,
        id:user._id,
        email:user.email,
    },process.env.JWT_SECRET,{expiresIn:'1h'});
    res.cookie('token',token,{httpOnly:true,maxAge:3600000})
    // send({ data:user , token : token, path:'/my-profile',isAdmin:false});
    return res.status(200).json({
        success:true,
        message:"user logged in successfully",
        token,
        user,
        path:"/my-profile",
    })
}
catch(error){
    console.log(error);
    return res.status(200).json({
        success:false,
        message:"login failure plz try again"
    })
}
});

module.exports = router;
