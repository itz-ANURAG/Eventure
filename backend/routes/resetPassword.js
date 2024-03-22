var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt =require('bcrypt')
const UserModel=require('../database/userData');
const jwt = require('jsonwebtoken')


/* GET users listing. */
router.post('/',async (req, res) => {
    console.log(req.body);
    const {password ,token} = req.body;
    const decode = jwt.verify(token , process.env.KEY);
    if(!decode){
        return res.json({status:false,massage:"Something went wrong"});
    }
    try {
        const hashedPassword =await bcrypt.hash(password,10)
        const user = await UserModel.findByIdAndUpdate({_id:decode.id,password :hashedPassword});
        if(!user){
            return res.json({status:false , massage:"Something went wrong"})
        }
        res.send({status:true , massage:"Reset Password Successfully"});
    } catch (error) {
        console.log(error);
        res.json({status:false,massage:"Something Went Wrong"});
    }
});

module.exports = router;
