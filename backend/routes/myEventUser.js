var express = require('express');
var passport = require('passport');
var router = express.Router();
const jwt = require('jsonwebtoken')
const eventCreate = require('../Models/eventRegister')
const userModel=require('../Models/userData');
const { path } = require('../app');
require("dotenv").config();


/* GET users listing. */
router.get('/', async (req, res) => {
    try {
        const token= req.cookies.token;
        // console.log("token",token)
        const isVerified = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(isVerified)
        if(!isVerified){
            console.log("Not verified")
            res.send({status:false});
        }
        else{
            const user=await userModel.find({_id:isVerified.id}).populate({path:'eventRegistered',model:'eventCreate'})
            // console.log("user" , user)
            res.send({status:true,data:user});
        }
    } catch (error) {
        console.log(error)
        res.send({status:false})
    }
});

module.exports = router;
