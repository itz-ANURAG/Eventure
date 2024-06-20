
const express = require('express');
const router = express.Router();
const razorpay=require("razorpay");

const instance=new razorpay({
  key_id:process.env.RAZORPAY_API_KEY_ID,
  key_secret:process.env.RAZORPAY_API_KEY_SECRET,
});


router.post("/",async (req,res)=>{
    try{
        // console.log(req.body.price)
    const options={
      amount:Number(req.body.price*100),
      currency:"INR",
    }
    // console.log("hi")

    if (!instance.orders) {
        throw new Error("Razorpay instance.orders is not defined");
      }
  
      const order = await instance.orders.create(options);
    // console.log(order);
    res.status(200).json({
      success:true,
      message:"order created successfully",
      order,
    })
  }
  catch(error){
      console.log(error);
      res.status(500).json({
          success:false,
          message:"failed in creating order"
      })
   }
  });

  module.exports = router;