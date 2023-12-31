const path=require('path');
const express=require('express');
const userRoute=require("./routes/user");
const mongoose=require("mongoose");
const {ConnectMongoDb}=require('./connection');

const app=express();
const PORT=8000;

ConnectMongoDb('mongodb://localhost:27017/blogify').then(()=>console.log("MongoDb Connected")).catch((error)=>console.log(error));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    return res.render('home.ejs');
})
app.use("/user",userRoute);

app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`));