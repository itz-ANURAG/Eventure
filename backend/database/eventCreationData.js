const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    createrId : {
        type: String,
        required:true
    },
    eventName:{
        type:String,
        // unique:true,w
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
    }
});

const eventCreate = mongoose.model('eventCreate',EventSchema);

module.exports = eventCreate;