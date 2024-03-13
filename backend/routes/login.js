var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt =require('bcrypt')
const UserModel=require('../database/userData');
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.post('/',async (req, res) => {
    console.log(req.body);
    const user = await UserModel.findOne({username:req.body.username});
    if(!user){
        
        console.log("error")
       return res.send("error");
    }
    const validPassword = bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        console.log("wrong Password")
        return res.send();
    }
    const token = jwt.sign({username:user.username},"aryanKesahrwani@21022003",{expiresIn:'1h'});
    res.cookie('token',token,{httpOnly:true,maxAge:3600000})

    
    return res.send({ data:user , token : token, path:'/About'});
});

module.exports = router;
