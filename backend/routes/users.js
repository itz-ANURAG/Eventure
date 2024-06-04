var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt =require('bcrypt')
const UserModel=require('../database/userData');
const jwt = require('jsonwebtoken')


/* GET users listing. */
router.post('/register',async (req, res) => {
  console.log(req.body);
  const hashPassword = await bcrypt.hash(req.body.password,10);
  const userData=new UserModel({
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullName,
    password:hashPassword
  }) 
  await userData.save();
  console.log("registerd successfully")
  const token = jwt.sign({username:userData.username,id:userData._id},process.env.KEY,{expiresIn:'1h'});
  res.cookie('token',token,{httpOnly:true,maxAge:3600000})
  console.log("user registered succesfully");
  console.log(userData);
  res.send({ data:userData , path:'/userProfile', token:token});
});

module.exports = router;
