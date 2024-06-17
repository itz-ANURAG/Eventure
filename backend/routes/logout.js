const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    try{
    console.log("logging out");
    res.clearCookie('token')
     return res.status(200).json({ 
        success: true,
        message:"logged out successfully"
     });
    }catch(error){
        console.log(error)
       return  res.status(500).json({
            success:false,
            message:"error logging out"
        })
    }
})


module.exports = router;