const express = require('express');
const router = express.Router();
const userdb = require('../database/userData')
var nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config();
const _email= process.env.GOOGLE_MAIL;
const _password= process.env.GOOGLE_PASSWORD;
router.post('/', async (req, res) => {
    console.log(_email);
    console.log(_password);
    try {
        const user = await userdb.findOne({ email: req.body.email })
        if (!user) {
            res.json({ message: "Not registerde user", status: false });
        }
        console.log(user);
        console.log(req.body.email)
        const token=jwt.sign({
            id:user._id,
        },process.env.KEY,{expiresIn:'1h'});
        console.log("Token ", token);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "aryankesarwani21022003@gmail.com",
                pass: ""
            }
        });

        console.log("transporter",transporter)

        var mailOptions = {
            from: "aryankesarwani21022003@gmail.com",
            to: req.body.email,
            subject: 'Reset Password',
            text: `http://localhost:3000/forget-password/${token}`
        };

        console.log("mailOption",mailOptions)

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error",error);
                return res.json({status:false,massage:"Error"});
            } else {
                console.log("success");
                return res.json({status:true,massage:"Succesfully reset"});
            }
        });
    } catch (error) {
        return res.json(error)
    }
})


module.exports = router;