const fs = require("fs");

function logger() {
  return (req, res, next) => {
    console.log("checking diff between passing parethesis or not");
    next();
  };
}


function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${req.method}: ${req.path}`,
      (error, data) => {
        next();
      }
    );
  };
}


function printName() {
  return (req, res, next) => {
    console.log("Getting started with middleware 2");
    next();
  };
}

module.exports={
    logger,
    logReqRes,
    printName,
}