const mongoose = require('mongoose');


const adminModel = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    eventCreated:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"eventCreate",
        default:{}
    }],
    eventRegistered:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"eventCreate",
        default:{}
    }],
}) 


const admin = mongoose.model('admin',adminModel);
module.exports = admin;