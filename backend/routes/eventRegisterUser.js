var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const eventRegister = require('../database/eventRegister')
const nodemailer = require('nodemailer');
/* GET users listing. */
router.post('/', async (req, res) => {
    try {
        const {
            eventName,
            eventDate,
            eventTime,
            eventId,
            userId,
            userName,
            userEmail,
            phoneNo
        } = req.body;

        console.log(req.body);

        const existingUser = await eventRegister.find({
            $and: [
                { userId: userId },
                { eventId: eventId }
            ]
        });
        
        if (existingUser.length > 0) {
            console.log("already registered");
            return res.send({status:false, message: "Already registered for the event" });
        } else {
            const newUser = new eventRegister({
                eventName: eventName,
                eventDate: eventDate,
                eventTime: eventTime,
                eventId: eventId,
                userId: userId,
                userName: userName,
                userEmail: userEmail,
                phoneNo: phoneNo
            });

            console.log("registering");
            await newUser.save();
            console.log("model save")
            try {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "aryankesarwani21022003@gmail.com",
                        pass: "jtuw acdk nutl qjts"
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
            return res.send({status:true, message: "Registered Successfully" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.json({ message: "Something went wrong" });
    }

});

module.exports = router;
