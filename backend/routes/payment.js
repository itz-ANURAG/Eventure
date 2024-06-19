
const instance=require("../app.js");
const crypto =require("crypto")
require("dotenv").config()


exports.checkout=async (req,res)=>{
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
};

exports.paymentVerification=async (req,res)=>{
   const {razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
   }=req.body;
   const body=razorpay_order_id + "|" + razorpay_payment_id;
   const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_API_KEY_SECRET).
                                   update(body.toString()).
                                   digest('hex');
                                   console.log("sig recieved ",razorpay_signature);
                                   console.log("sig generated ",expectedSignature);
    

   
    const isAuthentic = expectedSignature === razorpay_signature;
    if(isAuthentic){
       res.status(200).json({
        success:true,
        message:"payment is successfull"
       })
    }else{
        res.status(500).json({
            success:false,
            message:"payment verification failed"
        });
    }
};