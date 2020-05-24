const MongoClient = require('mongodb').MongoClient;
const assert=require("assert");

 // Connection URL
 const url = 'mongodb://localhost:27017';

 const dbName = 'cars';

 const client = new MongoClient(url,{ useUnifiedTopology: true });



const insertDocuments = function(db, callback) {
  // Get the documents collection
const collection = db.collection('hyundai');

  // Insert some documents
collection.insertMany([
  {name : "grand vitara", type :"SUV", price : 150000 }
], function(err, result) {
  assert.equal(err, null);
  assert.equal(1, result.result.n);
  assert.equal(1, result.ops.length);
  console.log("Inserted 3 documents in collection");
  callback(result);
});
} 

// find
const findDocuments = function(db, callback) {
   
  // Get the documents collection
  const collection = db.collection('suzuki');
 
   // Find some documents
  collection.find({"type":"hatchback"}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
  });
}
// update

const updateDocument = function(db, callback) {
 
  // Get the documents collection
  const collection = db.collection('products');

  // Update document where x is 5, set y equal to 8
  collection.updateOne({ name : "Iphone X" }
  , { $set: { price : 91000 } }, function(err, result) {
  assert.equal(err, null);
  assert.equal(1, result.result.n);
  console.log("Updated the document");
  callback(result);
});  
} 
 

 client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to MongoDB");
    const db = client.db(dbName);
    
    
    // insertDocuments(db, function() {
    //   client.close();
    // });
    
    // findDocuments(db,function(){
    //   client.close()
    // })

    updateDocument(db,()=>{
      client.close()
    })
    
  });
