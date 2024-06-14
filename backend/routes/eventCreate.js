var express = require('express');
var passport = require('passport');
var router = express.Router();
var bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const eventCreate = require('../Models/eventCreationData')
// GET users listing
router.post('/', async (req, res) => {
    try {
        console.log("creating Event")
        const token = req.cookies.token||req.body.token;    // Extracting Token from Cookies
        if (!token) {
            console.log("NO Token")
            res.send({ success: false, path: '/', message: "Login first" }) }
            // const isVerified = jwt.verify(token, 'aryanKesahrwani@21022003');
            // if(!isVerified) console.log("NOt verified")
            // else console.log(isVerified)
            let isVerified;
                try {
                    isVerified = jwt.verify(token, process.env.JWT_SECRET || 'aryanKesahrwani@21022003'); // Use environment variable for secret
                } catch (error) {
                    console.log("Invalid Token");
                    return res.send({ success: false, path: '/', message: "Invalid token" });
                }

                if (!isVerified) {
                    console.log("Not verified");
                    return res.send({ success: false, path: '/', message: "Token verification failed" });
                } else {
                    console.log(isVerified);
                }

            // Creating New Event

        const event = new eventCreate({
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventDescription: req.body.eventDescription,
            creater: isVerified.id,
            eventPrice: req.body.eventPrice,
            eventTime: req.body.eventTime,
            eventBanner:req.body.eventBanner,
        });
        console.log("model ready");
        await event.save();
        console.log("event save succesfulluy");
        return res.send({ success: true, path: '/my-profile', message: "Event created Succesfully" })
    } catch (error) {
        console.log("error in creation",error)
        res.send({ success: false, path: '/my-profile', message: "Something went wrong" })
    }

});

// // GET events with search, sort, and filter
// router.get('/', async (req, res) => {
//     try {
//         const { search, sort, filter, page = 1, limit = 10 } = req.query;

//         let query = {};
//         if (search) {
//             query = {
//                 ...query,
//                 $or: [
//                     { eventName: { $regex: search, $options: 'i' } },
//                     { eventDescription: { $regex: search, $options: 'i' } }
//                 ]
//             };
//         }

//         if (filter) {
//             query.eventPrice = { $lte: Number(filter) };
//         }

//         const sortOptions = {};
//         if (sort) {
//             sortOptions[sort] = 1; // Ascending sort
//         }

//         const events = await Event.find(query)
//             .sort(sortOptions)
//             .skip((page - 1) * limit)
//             .limit(Number(limit));

//         const count = await Event.countDocuments(query);

//         res.json({
//             events,
//             totalPages: Math.ceil(count / limit),
//             currentPage: Number(page)
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching events', error });
//     }
// });

module.exports = router;
