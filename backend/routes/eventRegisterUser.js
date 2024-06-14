var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const eventCreate = require('../Models/eventCreationData')
const userModel=require("../Models/userData")
const nodemailer = require('nodemailer');
require("dotenv").config();

/* GET users listing. */
const verifyUser = async (req, res, next) => {
    // console.log(req.cookies)
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(404).json({
                success:false,
                message:"token is missing",
                path:"/"
            })
        }
        // console.log(token)
        try{
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        if(!decoded){
            console.log("unauthorised");
            return res.status(403).json({ success: false, massage: "Login first" })
        }
        const userData= await userModel.findOne({username:decoded.username});
       req.user=userData;
       
    }
    catch(error){
        console.log(error);
       return res.status(401).json({
            success:false,
            message:"token is invalid"
        })
    }
    next(); 
    }
    catch (err) {
        console.log(err);
       return res.status(500).json({
            success:false,
            message:"something went wrong while validating the token",
        });
    }
}

router.post('/',verifyUser, async (req, res) => {
    try {
        const{
            userName,
            email,
            phone,
            event
        } = req.body;
        const eventId=event._id;

        const eventDoc=await eventModel.findOneAndUpdate(
            {_id:eventId},
           {  $push: {userEnrolled:req.user._id} },
           {new:true}
        );
        
        const user=await userModel.findOneAndUpdate(
                             {_id:req.user._},
                             { $push: {eventRegistered: eventDoc._id } },
                             {new:true}
        ) 
           
            console.log("registered for event successfully")
            console.log(user);
            console.log(eventDoc);
            return res.status(200).json({
                success:true,
                message: "Registered for event Successfully", 
                path:"my-profile"
            });
        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success:false,
            message: "Something went wrong" });
      }

});

module.exports = router;


 // <----------------------------------- Node Mailer Code ------------------------------------------>        
/*
            try {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "aryankesarwani21022003@gmail.com",
                        pass: "dummy"
                    }
                });
        
                console.log("transporter",transporter)
        
                var mailOptions = {
                    from: "aryankesarwani21022003@gmail.com",
                    to: userEmail,
                    subject: 'Registration Successfull',
                    text: `You have registerd for event ${eventName} and your ticket id is ${newUser._id}`
                };
                console.log("mailOption",mailOptions)
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("error",error);
                        // return res.send({status:false,massage:"Error"});
                    } else {
                        console.log("success");
                        // return res.send({status:true,massage:"Succesfully reset"});
                    }
                });
            } catch (error) {
                console.log(error)
            }
*/            