const mongoose=require('mongoose');

async function connectMongoDb(url){
    return mongoose.connect(url).then(()=>console.log('Database linked')).catch((err)=>console.log(err))
    
}
module.exports={connectMongoDb};
