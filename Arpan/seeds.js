const mongoose = require('mongoose');
const User = require('./models/schema');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/students',{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err=>{
        console.log("MONGO ERROR")
        console.log(err)
    })

const seedUsers=[
    {
        name:'SOMIL AGGARWAL',
        enrollment:22115147,
        imgsrc:'views/images/somil.png',
        password:'22115147'
    },
    {
        name:'AKSHIT SINGH',
        enrollment:22115015,
        imgsrc:'views/images/akshit.jpg',
        password:'22115015'  
    },
    {
        name:'SOMSHEKHAR SHARMA',
        enrollment:22115146,
        imgsrc:'views/images/som.png',
        password:'22115146'
    },
    {
        name:'ARPAN MAHANTY',
        enrollment:22115030,
        imgsrc:'views/images/arpan.jpg',
        password:'22115030'
    }
]

User.insertMany(seedUsers)
    .then(res=>{
        console.log(res)
    })
    .catch(e=>{
        console.log(e)
    })