const express = require("express");
const app = express();
const morgan = require("morgan");
const usersRouter = require('./Routes/moviesRoute');
const User=require("./models/user.model")
const {connectMongoDb}=require('./connection');
const{logger,logReqRes,printName}=require('./middlewares');

const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 15; 

//connection
connectMongoDb('mongodb://127.0.0.1:27017/firstapp');




app.get("/users", async(req, res) => {
    const  allDbUsers=await User.find({})
    const html = `
       <ul>
          ${allDbUsers.map((user) => `<li>${user.firstName} -${user.email}</li>`).join("")}
       </ul>
      `;
    return res.send(html);
});



// Middleware
// app.use(morgan('tiny'));
// GET /api/users/1004 200 52 [size of response] - 13.163 ms[time for response]


app.use(morgan("dev"));
//GET /api/users/1004 200[status code come color in case we use dev in morgan] 19.069 ms[time for the response] - 52[size of the response]

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//to render server static files
app.use(express.static('./public'))

//Rest api 2
app.use(logger());

app.use(logReqRes('log.txt'));

app.use(printName());

// Rest Api
// app.get("/api/users", (req, res) => {
//   return res.json(users);
// });


app.use('/api/users',usersRouter);


















// app.post("/api/users", (req, res) => {
//   const body = req.body;
//   users.push({ ...body, id: users.length + 1 });
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
//     if (error) {
//       return res.json({ status: "failure" });
//     } else if (data) {
//       return res.json({ status: "success", id: users.length });
//     }

//   });
// });

// app
//   .route("/api/users/:id")
//   .get((req, res) => {
//     const id = +req.params.id;
//     const user = users.find((user) => user.id == id);
//     return res.send(user);
//   })
//   .patch((req, res) => {
//     const id = +req.params.id;
//     const user=users.find((user)=>user.id==id);
//     const index=users.indexOf(user);
//     const body=req.body;

//     users[index]={...users[index],...body};
//     fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error,data)=>{
//       if(error){
//         return res.json({status:"failure"});
//       }else if(data){
//         return res.json({status:"Success",id})
//       }
//     })
//   }).delete((req,res)=>{
//     const id=req.params.id*1;
//     const user=users.find((user)=>user.id==id);
//     const index=users.indexOf(user);
//     users.splice(index,1);

//     fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error,data)=>{
//       if(error){
//         return res.json({status:"failure"});
//       }else if(data){
//         return res.json({status:"success",id});
//       }
//     })

//   });
module.exports=app;