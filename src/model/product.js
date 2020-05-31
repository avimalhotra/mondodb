var mongoose = require('mongoose');

const db = mongoose.connection;

const Schema = mongoose.Schema;

const Product = new Schema({
    name: String,
    type: String,
    price: Number,
    capacity:Number,
    available:Boolean
}, { collection: 'products' });

var Ac = mongoose.model("Ac", Product);

module.exports=Ac;