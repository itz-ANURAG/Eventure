var express = require('express');
var passport = require('passport');
var router = express.Router();
const jwt = require('jsonwebtoken')
const eventCreate = require('../database/eventCreationData')

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
        const token= req.cookies.token;
        // console.log("token",token)
        const isVerified = jwt.verify(token,process.env.KEY)
        console.log(isVerified)
        if(!isVerified){
            console.log("Not verified")
            res.send({status:false});
        }
        else{
            const admin=await eventCreate.find({createrId:isVerified.id})
            console.log("admin" , admin)
            res.send({status:true,data:admin});
        }
    } catch (error) {
        res.send({status:false})
    }
});

module.exports = router;
