const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    enrollment:{
        type:Number,
        required:true,
        min: 0
    },
    imgsrc: {
        type:String,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength: [8, 'Must be longer than 8 letters'],
    }
})

const User = mongoose.model('User',Schema);
module.exports = User;