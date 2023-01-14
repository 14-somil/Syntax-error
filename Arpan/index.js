const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt=require('bcrypt');
const session = require('express-session');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/SynErrP',{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err=>{
        console.log("MONGO ERROR")
        console.log(err)
    })
 
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended:true}));
app.use(session({secret: 'notagoodsecret'}))

app.use(express.static(__dirname + '/public'));

const requireLogin = (req,res,next)=>{
    if(!req.session.user_id){
        return res.redirect('/backbench/signin')
    }
    next();
}

app.get('/backbench',(req,res)=>{
    res.render('welcome')
})
app.get('/backbench/signin',(req,res)=>{
    res.render('signin')
})
app.get('/backbench/signup',(req,res)=>{
    res.render('signup')
})

app.post('/backbench/signup',async (req,res)=>{
    const {password,username}=req.body;
    const hash = await bcrypt.hash(password,12);
    // const user = new User({
    //     username,
    //     password:hash
    // })
    // await user.save();
    const founduser= await User.findOne({username:username});//*
    await User.findOneAndUpdate({username:username},{password:hash},{new:true});//*
    req.session.user_id=founduser._id;
    res.redirect('/backbench')
})

app.post('/backbench/signin',async (req,res)=>{
    const{username,password}=req.body;
    const foundUser= await User.findAndValidate(username, password);
    if(foundUser){
        req.session.user_id=foundUser._id;
        // res.redirect('/backbench/main')
        
        res.render('main',{foundUser})
    }
    else{
        res.send("ERROR, TRY AGAIN")
    }
})

app.get('/backbench/main',requireLogin,(req,res)=>{
    res.render('main')
})

app.post('/backbench/logout',(req,res)=>{
    // req.session.user_id=null;
    req.session.destroy();
    res.redirect('/backbench');
})

app.get('/backbench/aboutus',(req,res)=>{
    res.render('AboutUs')
})


app.get('/backbench/attendance',requireLogin,(req,res)=>{
    
    const founduser= User.find({_id:mongoose.Types.ObjectId(req.session.user_id)})
    res.render('BBattendance',{founduser})
    console.log(founduser)
})
// app.get('/attendance',async (req,res)=>{
//     const Array =await User.find({}) 
//     res.render('attendance',{Array})
// })

// app.post('/backbench/attendance',async (req,res)=>{
//     const {date,username}=req.body;
//     const founduser= await User.findOne({username});
//     founduser.aggregate([{
//         $addFields:{
//            attendance:[{date:date},]
//         }
//     }])
//     res.redirect('/attendance')
// })

app.listen(3000)