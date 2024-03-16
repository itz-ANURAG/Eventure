const express = require('express');
const router = express.Router();
const userdb = require('../database/userData')
var nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        const user = await userdb.findOne({ email: req.body.email })
        if (!user) {
            res.json({ message: "Not registerde user", status: false });
        }
        console.log(user);
        const token=jwt.sign({
            username:user.username,
            email:user.email
        },process.env.KEY,{expiresIn:'5m'});
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "aryankesarwani21022003@gmail.com",
                pass: 'xlzr bwtk przh odbp'
            }
        });

        var mailOptions = {
            from: "aryankesarwani21022003@gmail.com",
            to: req.body.email,
            subject: 'Reset Password',
            text: `http://localhost:3000/forget-password/${token}`
        };

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