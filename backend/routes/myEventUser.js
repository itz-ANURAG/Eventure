var express = require('express');
var passport = require('passport');
var router = express.Router();
const jwt = require('jsonwebtoken')
const userModel=require('../Models/userData');
const { path } = require('../app');
require("dotenv").config();


/* GET users listing. */
router.get('/', async (req, res) => {
    try {
        const token= req.cookies.token;
        // console.log("token",token)
        const isVerified = jwt.verify(token,process.env.JWT_SECRET||'aryanKesahrwani@21022003')
        // console.log(isVerified)
        if(!isVerified){
            console.log("Not verified")
            return res.status(403).json({
                success:false,
               message:"user is not verified"
            });
        }
        else{
            const user=await userModel.find({_id:isVerified.id}).populate({path:'eventRegistered',model:'eventCreate'})
            // console.log("user" , user)
           return res.status(200).json({
            success:true,
            data:user[0].eventRegistered,
            message:"event fetched successfully" 
        });

    }
 
    } catch (error) {
     console.log(error)
        return res.status(500).json({
            success:false,
         message:"unable to fetch event"
        })
    }
});

module.exports = router;