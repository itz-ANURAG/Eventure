var express = require('express');
var passport = require('passport');
var router = express.Router();
const jwt = require('jsonwebtoken')
const eventCreate = require('../database/eventCreationData')

// To Send Whole Running Event to Client Side
router.get('/', async (req, res) => {
    const eventData= await eventCreate.find({});
    res.statusCode = 200;
    res.json({
        data : eventData
    })
});

module.exports = router;
