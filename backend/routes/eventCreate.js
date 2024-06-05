var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const eventCreate = require('../database/eventCreationData')
process.env.KEY
// GET users listing
router.post('/', async (req, res) => {
    try {
        console.log("creating Event")
        const token = req.cookies.token;    // Extracting Token from Cookies
        if (!token) {
            console.log("NO Token")
            res.send({ success: false, path: '/', massage: "Login first" }) }
            const isVerified = jwt.verify(token, process.env.KEY);
            if(!isVerified) console.log("NOt verified")
            else console.log(isVerified)

            // Creating New Event

        const event = new eventCreate({
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventDiscription: req.body.eventDiscription,
            createrId: isVerified.id,
            eventPrice: req.body.eventPrice,
            eventTime: req.body.eventTime,
        });
        console.log("model ready");
        await event.save();
        console.log("evet save succesfulluy");
        return res.send({ success: true, path: '/adminProfile', massage: "Event created Succesfully" })
    } catch (error) {
        console.log("error in creation")
        res.send({ success: false, path: '/adminProfile', massage: "Something went wrong" })
    }

});

module.exports = router;
