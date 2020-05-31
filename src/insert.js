const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;


db.on('error', function (err) { throw err }); 

db.once('open', function() {
   console.log('mongoose connected!');

   const Schema=mongoose.Schema;

   const Car=new Schema({
    name:String,
    type:String,
    price:Number,
},{collection:'samplecars'});

var car=mongoose.model("car",Car);

car.find({},(err,data)=>{
    if(err){console.log(err)}
    else{ console.log(data)}
});
   
});