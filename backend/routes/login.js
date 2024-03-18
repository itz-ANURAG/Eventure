var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt =require('bcrypt')
const UserModel=require('../database/userData');
const jwt = require('jsonwebtoken')
const AdminModel = require('../database/adminModel');

/* GET users listing. */
router.post('/',async (req, res) => {
    console.log("login page")
    // console.log(req.body);
    const user = await UserModel.findOne({username:req.body.username});
    if(!user){
        try {
            const admin = await AdminModel.findOne({username:req.body.username});
            if(!admin){
                console.log("Not a  Admin");
                return res.send("error");
            }
            if(admin.password==req.body.password){
                const token = jwt.sign({
                    username:admin.username,
                    id:admin._id
                },process.env.KEY,{expiresIn:'1h'});
                res.cookie('token',token,{httpOnly:true,maxAge:3600000})
                return res.send({ data:user , token : token, path:'/my-profile', isAdmin:true});
            }
            else{
                console.log("Not a  Admin");
                return res.send("error");
            }
        } catch (error) {
            console.log("error")
           return res.send(error);
        }
    }
    const validPassword = bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        console.log("wrong Password")
        return res.send();
    }
    const token = jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'});
    res.cookie('token',token,{httpOnly:true,maxAge:3600000})

    
    return res.send({ data:user , token : token, path:'/my-profile',isAdmin:false});
});

module.exports = router;
