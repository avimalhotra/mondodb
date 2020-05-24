const express=require('express');
const app=express();
const mongodb=require("mongodb");
var env=require("dotenv").config();

const mdb=require('./mdb');

app.get("/",(req,res)=>{
    res.send("helo mongodb");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server running `)
})

