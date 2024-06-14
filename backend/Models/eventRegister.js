const mongoose = require('mongoose')

const EventRegisterSchema = new mongoose.Schema({
    userId : {
        type: String,
        // required:true
    },
    eventId : {
        type: String,
        // required:true
    },
    eventName:{
        type:String,
        // unique:true,w
        // required:true
    },
    eventDate:{
        type:Date,
        // required:true
    },
    eventTime:{
        type:String,
        // required:true
    },
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    }
});

const eventRegister = mongoose.model('eventRegisterByUser',EventRegisterSchema);

module.exports = eventRegister;