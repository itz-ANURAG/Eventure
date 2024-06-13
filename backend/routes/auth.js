const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const userD = require('../Models/userData')
require("dotenv").config();


var data;

const verifyUser = async (req, res, next) => {
    // console.log(req.cookies)
    try {
        const token = req.cookies.token;
        if (!token) {
            // send({ success: false, massage: "Login First", path: '/' });
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
        const userData= await userD.findOne({username:decoded.username});
       data=userData;
          
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

router.get('/', verifyUser, (req, res) => {
    // send({ success: true , data:data});
    return res.status(200).json({
        success:true,
        message:"user verified succesfully",
        data
    })
})




module.exports = router;