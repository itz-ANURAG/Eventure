var express = require('express');
var router = express.Router();
var passport = require('passport')
const dotenv=require('dotenv').config()
const jwt = require('jsonwebtoken')
const userdb=require('../Models/userData')
const clientID = process.env.ClientID;
const clientSecret = process.env.ClientSecret;
const callbackURL = process.env.CallbackURL;

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const { json } = require('body-parser');

passport.use(new GoogleStrategy({
    clientID:clientID,
    clientSecret:clientSecret,
    callbackURL:callbackURL,
    scope:['profile','email'],
    passReqToCallback   : true
  },
 async function(request, accessToken, refreshToken, profile, done) {
    //  console.log(profile);
    let data = await userdb.findOne({googleId:profile.id});
    let user
    if(!data){
        user=new userdb({
            googleId:profile.id,
            username:profile.displayName,
            fullname:profile.displayName,
            email:profile.email
        })
        await user.save();
        // res.send(profile);
        console.log("google saved")
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
    
    // console.log("reached",req.user);
    const token= jwt.sign({
        username:req.user.username,
        googleId:req.user.googleId,
        email:req.user.email,
        id:req.user._id
    },process.env.JWT_SECRET,{expiresIn:'1h'});
    res.cookie('token',token,{httpOnly:true,maxAge:3600000})
    return res.redirect('http://localhost:3000/my-profile');
})

router.get('/googleAuth/callback',
passport.authenticate( 'google',{
    successRedirect: '/api/google',
    failureRedirect: 'http://localhost:3000/Signin'
})
);

module.exports = router;