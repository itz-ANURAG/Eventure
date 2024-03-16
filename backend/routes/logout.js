const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    console.log("logging out");
    res.clearCookie('token')
    res.send({ success: true });
})


module.exports = router;