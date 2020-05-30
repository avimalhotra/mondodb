const mongoose=require('mongoose');
 mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

 const db=mongoose.connection;

 const Schema=mongoose.Schema;

var Car=new Schema({
    name:String,
    model:String,
    year:Number,
    available:Boolean
},{collection:'samplecars'});


var mycar=mongoose.model("mycar",Car);

var swift=new mycar({
    name:"swift",
    model:"zxi",
    year:2018,
    available:true
 });

 db.on('error', function (err) { throw err }); 

 db.once('open', function() {
    console.log('mongoose connected!');
 
     swift.save(function (err, data) {
      if (err){
          return console.log(err); db.close();
         }
      else{
          console.log(data.name + " saved to collection."); 
          db.close();
         }
    });
 });