const express = require('express');
const router = express.Router();
const crypto =require("crypto")
require("dotenv").config()

router.post( "/",async (req,res)=>{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

            console.log("sig generated ",razorpay_signature)
            console.log("expected ",expectedSignature)

        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {
            return res.status(200).json({
                success: true,
                message: "Payment is successful"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while payment verification"
        });
    }
});

module.exports = router;