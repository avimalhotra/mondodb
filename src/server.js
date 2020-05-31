const express = require('express');
const app = express();
var path=require('path');
var env = require("dotenv").config();
const nunjucks=require('nunjucks');
var bp=require('body-parser');

//app.use(bp.json());  
app.use(bp.urlencoded({ extended: false })); 

app.use(express.static(path.resolve(__dirname,'public')));

// configure
nunjucks.configure(path.resolve(__dirname,'public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 


//require("./db");
//require("./insert");

require('./dao');
var schema = require('./model/index');


app.get("/", (req, res) => {
    res.render('index.html');
});
app.get('/savep', (req, res) => {
    var hitachi = new schema.product({
        name: "Lg 1.5",
        type: "Split",
        price: 36000,
        capacity: 1.5,
        available: true
    });

    hitachi.save((err, data) => {
        if (err) {
            res.status(500).send("Error");
        }
        else {
            res.send("data Saved");
        }
    })


});
app.get('/saves', (req, res) => {

    var amc = new schema.service({
        name: "AMC partial",
        amount: 3000,
        freq: 4,
        capacity: 1.0,
        available: true
    });

    amc.save((err, data) => {
        if (err) {
            res.status(500).send("Error");
        }
        else {
            res.send("data Saved");
            console.log("data saved")
        }
    })

});
app.get('/product', (req, res) => {

    schema.product.find({}, (err, data) => {
        if (err) {
            res.status(500).send("Error")
        }
        else {
            res.status(200).render("product.html",{product:data});
        }
    });


});

app.get('/services', (req, res) => {
    schema.service.find({}, (err, data) => {
        if (err) {
            res.status(500).send("Error")
        }
        else {
            res.status(200).render("service.html",{service:data});
        }
    });
});

app.get('/insert-p', (req, res) => {
    res.render("insert-p.html");
});

app.post('/saveproduct', (req, res) => {
    var data=req.body;
    console.log(data);
    //res.json(data);

    //res.send("data sent");
    var data=new schema.product(req.body);
    data.save((err,data)=>{
        if (err) {
            res.status(500).send("Error");
        }
        else {
            res.send("data Saved");
            console.log("data saved");
        }
    })



})


app.listen(process.env.PORT, () => {
    console.log(`Server running `)
});
