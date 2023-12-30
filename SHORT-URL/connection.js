const mongoose=require('mongoose');

async function connectmongoDb(url){
    return mongoose.connect(url);

}
module.exports={connectmongoDb};