var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt =require('bcrypt')
const UserModel=require('../Models/userData');
const jwt = require('jsonwebtoken')
require("dotenv").config();


/* GET users listing. */
router.post("/signUp",async (req, res) => {
  try{ 
        //  fetching data from req body
      const  {
          fullName,
          username,
          email,
          password
        } = req.body;

        console.log(req.body);
        if(!username || !password ||!email || !fullName){
          return res.status(403).json({
            sucess:false,
            message:"All fields are required",
          })
        } 

        // check for existing user
        const existingUser=await UserModel.findOne({email});
        if(existingUser){
          return res.status(400).json({
            success:false,
            message:"user is already registered",
          })
        }
    //hashing password
  let hashedPassword = await bcrypt.hash(password,10);

  // creating entry in db
  const user=new UserModel({
    username,
    fullname:fullName,
    email,
    password:hashedPassword, 
  }) 
  await user.save();
  console.log("registerd successfully");

  const token = jwt.sign({username:user.username,id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
  res.cookie('token',token,{httpOnly:true,maxAge:3600000})
  console.log("user registered succesfully");
  console.log(user);

  // res.send({ data:userData , path:'/my-profile', token:token});
  return res.status(200).json({
    sucess:true,
    message:"user is registered succesfully",
    data:user,
    token,
    path:"/my-profile",
  })
}
catch(error){
  console.log(error);
   return res.status(500).json({
    sucess:false,
    message:"something went wrong while signing in",
    error,
   }  )
} 
});

module.exports = router;
