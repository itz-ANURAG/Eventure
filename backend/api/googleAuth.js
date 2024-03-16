var express = require('express');
var router = express.Router();
var passport = require('passport')
const dotenv=require('dotenv').config()
const jwt = require('jsonwebtoken')
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL;

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const userdb = require('../database/googleAuth');
const { json } = require('body-parser');

passport.use(new GoogleStrategy({
    // clientID:clientID,
    // clientSecret:clientSecret,
    // callbackURL:callbackURL,
    clientID:"123",
    clientSecret:"xyz",
    callbackURL:"asd",
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
    return res.redirect('http://localhost:3000/userProfile');
})

router.get('/googleAuth/callback',
passport.authenticate( 'google',{
    successRedirect: '/api/google',
    failureRedirect: 'http://localhost:3000/Signin'
})
);

module.exports = router;