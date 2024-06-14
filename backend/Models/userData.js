const mongoose = require('mongoose');

// const plm = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
    },
    eventCreated:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"eventCreate"
    }],
    eventRegistered:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"eventCreate",
    }],
    googleId:{
        type:String,
    },
},
{
    strictPopulate: false
} 
);

const User = mongoose.model('user', UserSchema);

// UserSchema.plugin(plm);
module.exports = User;