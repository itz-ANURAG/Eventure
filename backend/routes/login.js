var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt =require('bcrypt')
const UserModel=require('../Models/userData');
const jwt = require('jsonwebtoken')
require("dotenv").config();
const AdminModel = require('../Models/adminModel');

/* GET users listing. */
router.post('/login',async (req, res) => {
    try{
         const {
            email,
            password
         }=req.body;

         if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required try again",
            });
         }
         
    console.log("login page")
    console.log(req.body)
    const user = await UserModel.findOne({email});
    if(!user){
        try {
            const admin = await AdminModel.findOne({email});
            if(!admin){
                return res.status(401).json({
                    success:false,
                    message:"Not a Admin plz fill correct details"
                })
            }
            if(admin.password==password){
           const token = jwt.sign({
                    username:admin.username,
                    id:admin._id,
                    role:"admin"
                },
                process.env.JWT_SECRET,
                {expiresIn:'2h'}
            );
              
            admin=admin.toObject();
            admin.password=undefined;

           res.cookie('token',token,{httpOnly:true,maxAge:3600000})
           return res.status(200).json({
            success:true,
            message:"admin logged in successfully",
            token,
            isAdmin:true,
            path:"my-profile",
            data:admin
           })
            }
            else{
              return res.status(403).json({
                success:false,
                message:"Not a Admin plz password mismatch",
              })
            }
        } catch (error) {
            console.log("error")
           return res.status(500).json({
           success:false,
            message:"something went wrong while logging in admin"
        })
        }
    }
    const validPassword = bcrypt.compare(password,user.password);
    if(!validPassword){
        console.log("wrong Password")
        return res.status(401).json({
            success:false,
            message:"wrong user password plz enter valid password"
        })
    }
    console.log(user)
    const token = jwt.sign({
        username:user.username,
        id:user._id,
        email:user.email,
        role:"normal"
    },process.env.JWT_SECRET,{expiresIn:'1h'});

     user=user.toObject();
     user.role=normal;
     user.password=undefined;

    res.cookie('token',token,{httpOnly:true,maxAge:3600000})
    // send({ data:user , token : token, path:'/my-profile',isAdmin:false});
    return res.status(200).json({
        success:true,
        message:"user logged in successfully",
        token,
        user,
        path:"my-profile",
        isAdmin:false,
    })
}
catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"login failure plz try again"
    })
}
});

module.exports = router;
