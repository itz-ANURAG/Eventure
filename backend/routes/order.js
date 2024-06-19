
const express = require('express');
const router = express.Router();
const instance=require("../app.js");

router.post("/",async (req,res)=>{
    try{
    const options={
      amount:Number(req.body.price*100),
      currency:"INR",
    }
    const order=await instance.orders.create(options);
    console.log(order);
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