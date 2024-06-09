const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    creater : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    eventName:{
        type:String,
        required:true
    },
    eventDate:{
        type:Date,
        required:true
    },
    eventTime:{
        type:String,
        required:true
    },
    eventDiscription:{
        type:String,
        required:true
    },
    eventPrice:{
        type:Number,
        required:true
    },
    createDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    userEnrolled:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"   
    }
});

const eventCreate = mongoose.model('eventCreate',EventSchema);

module.exports = eventCreate;