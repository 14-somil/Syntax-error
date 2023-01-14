const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb://127.0.0.1:27017/SynErrP',{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err=>{
        console.log("MONGO ERROR")
        console.log(err)
    })

const seedInformation=[
    {
        username: "Arpan",
        enrollmentNumber:22115030,
        password:"22115030",
        imgsrc:"images/arpan.jpg"
    },
    {
        username: "Somil",
        enrollmentNumber:22115147,
        password:"22115147",
        imgsrc:"images/somil.png"
    },
    {
        username: "Akshit",
        enrollmentNumber:22115015,
        password:"22115015",
        imgsrc:"images/som.png"
    },
    {
        username: "Somshekhar",
        enrollmentNumber:22115146,
        password:"22115146",
        imgsrc:"images/som.png"
    }

]

User.insertMany(seedInformation)
    .then(res=>{
        console.log(res)
    })
    .catch(e=>{
        console.log(e)
    })