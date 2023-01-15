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
        imgsrc:"/image/arpan.jpg",
        manPresent: [1,2,4,6,8,9,10,11,17,18,19,20,22,23],
        phnPresent: [1,3,4,8,9,10,11,12,19,20,22,23],
        currentDate:23,
        daysRemaining:6
    },
    {
        username: "Somil",
        enrollmentNumber:22115147,
        password:"22115147",
        imgsrc:"/image/somil.png",
        manPresent: [1,2,5,6,8,9,10,12,17,18],
        phnPresent: [1,3,5,6,8,9,10,12,17,18],
        currentDate:23,
        daysRemaining:6
    },
    {
        username: "Akshit",
        enrollmentNumber:22115015,
        password:"22115015",
        imgsrc:"/image/akshit.jpg",
        manPresent: [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23],
        phnPresent: [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,23],
        currentDate:23,
        daysRemaining:6
    },
    {
        username: "Somshekhar",
        enrollmentNumber:22115146,
        password:"22115146",
        imgsrc:"/image/som.png"
    }

]

User.insertMany(seedInformation)
    .then(res=>{
        console.log(res)
    })
    .catch(e=>{
        console.log(e)
    })