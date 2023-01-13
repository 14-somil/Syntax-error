const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/schema');
const methodOverride=require('method-override')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/students',{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err=>{
        console.log("MONGO ERROR")
        console.log(err)
    })

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
// app.use(express.static(path.join(__dirname,'public')));

app.get('/barney',(req,res)=>{
    res.render('pages/welcome')
})
app.get('/barney/login',(req,res)=>{
    res.render('pages/login')
})
app.get('/barney/signup',(req,res)=>{
    res.render('pages/signup')
})
app.post('/barney/login',async(req,res)=>{
    const{username,password}= req.body;
    const founduser= await User.findOne(username,password);
    if (founduser){
        res.render('pages/main',{founduser})
    }
    else{
        res.send('record not found')
    }
})



app.listen(3000, () => {
    console.log("APP IS LISTENING")
})