const express = require('express');
const router = express.Router();
const userdb = require('../Models/userData')
var nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken')
require('dotenv').config();
const Email= process.env.GOOGLE_MAIL;
const Password= process.env.GOOGLE_PASSWORD;
router.post('/', async (req, res) => {
    console.log(Email);
    console.log(Password);
    try {
        const user = await userdb.findOne({ email: req.body.email })
        if (!user) {
           return res.status(403).json({ message: "not a registered user", success: false });
        }
        console.log(user);
        console.log(req.body.email)
        const token=jwt.sign({
            id:user._id,
        },process.env.JWT_SECRET,{expiresIn:'5min'});
        console.log("Token ", token);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.GOOGLE_MAIL ,
                pass:process.env.GOOGLE_PASSWORD
            }
        });

        console.log("transporter",transporter)

        var mailOptions = {
            from: process.env.GOOGLE_MAIL,
            to: req.body.email,
            subject: 'Reset Password',
            text: `${process.env.REACT_APP_BASE_URL}/reset-password/${token}`
        };

        console.log("mailOption",mailOptions)

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error",error);
                return res.status(500).json({success:false,massage:"Error in sending mail"});
            } else {
                console.log("success");
                return res.status(200).json({success:true,massage:"password recovered Succesfully"});
            }
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can`t recover password"
        })
    }
})


module.exports = router;