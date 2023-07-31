const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());
const cors=require("cors");
app.use(cors());
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const JWT_SECRET="shoiwopak;lQAhkdnsksjshgssososmbfdqeqtwu";
const JWT_SECRET1="ajdjflmvnidksfpfosjiollsmlfmflkdffofjfl";
const JWT_SECRET2="egjtjgignjkuqwertyuiopasdjfvuroflfkfgbgj";
const mongoUrl = "mongodb+srv://rohi17213it:LsgtOYh0TiDv13V9@cluster0.e5yi0fb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
})
.then(() =>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));
require("./userDetails")
require("./UserProfile")
require("./Quiz")
require("./Quiz2")
const User=mongoose.model("UserInfo");
const User1=mongoose.model("ProfileInfo");
const Quiz=mongoose.model("quizinfo");
const Quiz2=mongoose.model("quizinfo2");
app.post("/register",async(req,res) =>{
    const {fname,lname,email,password} =req.body;
    const encryptedPassword=await bcrypt.hash(password,10)
    try{
        const oldUser =await User.findOne({ email });

        if(oldUser){
            return res.send({error:"User Exists"})
        }
       await User.create({
        fname,
        lname,
        email,
        password:encryptedPassword
       });
       res.send({status:"ok"})
    }
    catch(error){
       res.send({status:"error"})
    }
})
app.post("/login-user",async(req,res) =>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({error:"User not found"})
    }
    if(await bcrypt.compare(password,user.password))
    {
        const token=jwt.sign({email:user.email},JWT_SECRET)

        if( res.status(201)){
            return res.json({status:"ok",data:token})
        }else{
            return res.json({status:"error"})
        }
    }
    res.json({status:"error",error:"invaid password"})
})
app.post("/search",async(req,res) =>{
    const {email}=req.body;
    const user1=await User.findOne({email});
    if(!user1)
    {
        return res.json({error:"User not found"})
    }
    else{
        const token1=jwt.sign({email:user1.email},JWT_SECRET1)
        if( res.status(201)){
            return res.json({status:"ok",data:token1})
        }else{
            return res.json({status:"error"})
        }
    }
})
app.post("/userData",async(req,res) =>{
    const {token}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const useremail=user.email;
        User.findOne({email:useremail})
        .then((data) =>{
            res.send({status:"ok",data:data})
        })
        .catch((error) =>{
            res.send({status:"error",data:error})
        })
    }
    catch(error){

    }
})
app.post("/userDataone",async(req,res) =>{
    const {token1}=req.body;
    try{
        const user=jwt.verify(token1,JWT_SECRET1);
        console.log(user);
        const useremail=user.email;
        User.findOne({email:useremail})
        .then((data) =>{
            return res.json({status:"ok",data:data})
        })
        .catch((error) =>{
            res.send({status:"error",data:error})
        })
    }
    catch(error){

    }
})

app.post("/quiz-data",async(req,res) =>{
     const {email,question1,option1,option2,option3,answer1,question2,option4,option5,option6,answer2,question3,option7,option8,option9,answer3}=req.body;
     const quiz=await Quiz2.findOne({email});
     const token2=jwt.sign({email:quiz.email},JWT_SECRET2)
     try{
        await Quiz2.create({
            email,
            question1,
            option1,
            option2,
            option3,
            answer1,
            question2,
            option4,
            option5,
            option6,
            answer2,
            question3,
            option7,
            option8,
            option9,
            answer3
        }
        )
        if( res.status(201)){
            return res.json({status:"ok",data:token2})
        }/* else{
            return res.json({status:"error"})
        } */
        res.send({status:"ok"})
    }
    catch(error){
        res.send({status:"error"})
    }
})
app.post("/challenge-quiz",async(req,res) =>{
/*     const{token2}=req.body;
    try{
        const quiz1=jwt.verify(token2,JWT_SECRET2);
        console.log(quiz1);
        const quizemail=quiz1.email;
        Quiz2.findOne({email:quizemail})
        .then((data) =>{
            res.send({status:"ok",data:data})
        })
        .catch((error) =>{
            res.send({status:"error",data:error})
        })
    }
    catch(error){

    } */
    const{token1}=req.body;
    try{
        const quiz1=jwt.verify(token1,JWT_SECRET1);
        const quizemail=quiz1.email;
        Quiz2.findOne({email:quizemail})
        .then((data) =>{
            res.send({status:"ok",data:data})
        })
        .catch((error) =>{
            res.send({status:"error",data:error})
        })
    }
    catch(error){
        
    }

})

app.listen(5000,() =>{
    console.log("server started");
})
