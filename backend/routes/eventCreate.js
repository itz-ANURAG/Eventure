const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const eventCreate = require('../Models/eventCreationData')
const userModel=require("../Models/userData")
const {uploadImageToCloudinary}=require("../config/cloudinary")

// GET users listing
router.post('/', async (req, res) => {
    try {
        console.log("hello");
        console.log(req.files);
        const thumbnail=req.files.image;
        console.log("creating Event")
        const token = req.cookies.token||req.body.token;    // Extracting Token from Cookies
        if (!token) {
            console.log("NO Token")
            return res.status(402).json({ 
                success: false, 
                path: '/login', 
                message: "Login first" 
            }) 
        }
            let isVerified;
                try {
                    isVerified = jwt.verify(token, process.env.JWT_SECRET || 'aryanKesahrwani@21022003'); // Use environment variable for secret
                } catch (error) {
                    console.log("Invalid Token");
                    return res.status(402).json({
                         success: false, 
                         path: '/login', 
                         message: "Invalid token"
                         });
                }

                if (!isVerified) {
                    console.log("Not verified");
                    return res.status(401).json({
                         success: false,
                          path: '/',
                          message: "Token verification failed"
                         });
                } else {
                    console.log(isVerified);
                }
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log(thumbnailImage);
        const event = await eventCreate.create({
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventDescription: req.body.eventDescription,
            creater: isVerified.id,
            eventPrice: req.body.eventPrice,
            eventTime: req.body.eventTime,
            eventBanner:req.body.eventBanner,
            userEnrolled:[isVerified.id],
            banner:thumbnailImage.secure_url 
        });

        const user=await userModel.findOneAndUpdate(
                                           {_id:isVerified.id},
                                            { $push: {eventCreated: event._id,eventRegistered: event._id } },
                                            { new: true } 
                                          );

        console.log("model saved and event created");
        return res.status(200).json({
             success: true,
             path: '/getAllEvents', 
             event,
             message: "Event created Succesfully"
             });
    } catch (error) {
        console.log("error in creation",error)
        return res.status(500).json({
             success: false,
              path: '/my-profile',
             message: "unable to create event"
             })
    }

});

module.exports = router;
