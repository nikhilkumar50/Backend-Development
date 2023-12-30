// const http=require("http");
// const fs=require('fs');
// const url=require('url');

// function myHandler(req,res){
//     if(req.url==='/favicon.ico')return res.end();
//     const log=`${new Date()} :${req.method} ${req.url} New Req recieved\n`
//     const myUrl=url.parse(req.url,true);
    

//     fs.appendFile("log.txt",log,(err,data)=>{
//         switch(myUrl.pathname){
//             case "/":
//                 res.end("HomePage");
//                  break;
//             case "/about":
//                 const userName=myUrl.query.myName;
//                 const userId=myUrl.query.userId;
//                 res.end(`Hi,the name is ${userName},and the userid is ${userId}`);
//                 break;
//             case "/search":
//                 const search=myUrl.query.search_query;
//                 res.end("Here are you results for" +search);
//             case "/signUp":
//                 if(req.method==='GET')res.end("This is signUp page");
//                 break;
//             default:
//                 res.end("Page not Found!!!");   
//         }
//     })

// }



// const myServer=http.createServer(app);

// myServer.listen(8000,()=>{
//     console.log("Server started!") 
// })

const express=require('express');

const app=express();
//app here is handler(instance of express)
//method is HTTP request method in lowercase
// path is a path on ther server
//Handler is the function executed when the route is matched

app.get('/',(req,res)=>{
    return res.send('Hello from Home page');
});

app.get('/about',(req,res)=>{
    res.send('hello from About Page'+'Your name is'+req.query.name+'your age is'+req.query.age);
})

app.listen(8000,()=>console.log("Server Started !!!"));




