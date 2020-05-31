var mongoose = require('mongoose');

const db = mongoose.connection;

const Schema = mongoose.Schema;

const Services = new Schema({
    name: String,
    amount: Number,
    freq:Number,
    capacity:Number,
    available:Boolean
}, { collection: 'services' });

var Amc = mongoose.model("amc", Services);

module.exports=Amc;