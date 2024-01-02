require('dotenv').config()
const path=require('path');
const express=require('express');
const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");
const mongoose=require("mongoose");
const {ConnectMongoDb}=require('./connection');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authetication');
const Blog=require("./models/blog");

const app=express();
const PORT=process.env.PORT || 8000;

ConnectMongoDb(process.env.MONGO_URL).then(()=>console.log("MongoDb Connected")).catch((error)=>console.log(error));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


app.get('/',async(req,res)=>{
    const allBlogs=await Blog.find({});
    return res.render('home.ejs',{
        user:req.user,
        blogs:allBlogs
    });
})
app.use("/user",userRoute);
app.use("/blog",blogRoute)
app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`)); 