const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const userD = require('../database/userData')
const adminD = require('../database/adminModel');
const admin = require('../database/adminModel');

var data;

const verifyUser = async (req, res, next) => {
    // console.log(req.cookies)
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.send({ success: false, massage: "Login First", path: '/' });
        }
        console.log(token)
        const decoded = await jwt.verify(token, process.env.KEY);
        console.log(decoded);
        if(!decoded){
            console.log("unauthorised");
            return res.send({ success: false, massage: "Login first" })
        }
        // console.log("succesfull")
        const userData= await userD.findOne({username:decoded.username});
        if(!userData){
            const adminData= await adminD.findOne({username:decoded.username})
            data=adminData;
        }
        else{
        data=userData;
    }
        next();
    }
    catch (err) {
        // console.log("error")
        res.json(err);
    }
}

router.get('/', verifyUser, (req, res) => {
    res.send({ success: true , data:data});
})




module.exports = router;