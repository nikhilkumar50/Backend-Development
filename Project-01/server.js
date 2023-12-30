const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

const app = require("./index");

const PORT = process.env.PORT ||8000

// console.log(process.env);


//there are two types of environment that is the development and production environment.

//environment variable are the global variable that are used to define the enviroment in which node app is running.

// to set environment variable
//-> SET NODE_DEV=development (this should be done after making the complete project)


// console.log(app.get("env"));

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}!!!`);
});

