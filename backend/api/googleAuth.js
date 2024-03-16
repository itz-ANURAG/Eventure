var express = require('express');
var router = express.Router();
var passport = require('passport')
const dotenv=require('dotenv').config()
const jwt = require('jsonwebtoken')

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const userdb = require('../database/googleAuth');
const { json } = require('body-parser');

passport.use(new GoogleStrategy({
    clientID:`${process.env.clientID}`,
    clientSecret:`${process.env.clientSecret}`,
    callbackURL:`${process.env.callbackURL}`,
    scope:['profile','email'],
    passReqToCallback   : true
  },
 async function(request, accessToken, refreshToken, profile, done) {
     console.log(profile);
    let data = await userdb.findOne({googleId:profile.id});
    var user;
    if(!data){
        user=new userdb({
            googleId:profile.id,
            username:profile.displayName,
            email:profile.email
        })
        await user.save();
        // res.send(profile);
        return done(null,user);
    }
    else {
        console.log("already registeered user");
        // res.send(data)
        return done(null,data);
    }
  }
));

router.get('/googleAuth',
passport.authenticate('google', { scope:
    [ 'email', 'profile' ] })
);

router.get('/google',(req,res)=>{
    // console.log(req.user);
    const token= jwt.sign({
        username:req.user.username,
        googleId:req.user.googleId,
        email:req.user.email
    },process.env.KEY,{expiresIn:'1h'});
    res.cookie('token',token,{httpOnly:true,maxAge:3600000})
    return res.send({ data:user , token : token, path:'/adminProfile'});
})

router.get('/googleAuth/callback',
passport.authenticate( 'google',{
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000/Signin'
})
);



module.exports = router;