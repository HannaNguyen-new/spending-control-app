// jshint esversion:6
/* const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); */
import express from "express";
import mongoose from "mongoose";
export{getDocs}

const app = express();
app.use(express.static("public"))
app.set("view engine", "ejs")

// bodyParser is included in express version 4 and above so there is no need to install it separately
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// for local env const url = "mongodb://localhost:27017/shopDB"
//the below url is to connect to mongodb atlas
//const url = "mongodb+srv://NGUYEN_boss:q3bzOXv7VLtPAG3i@cluster0.jpxwg.mongodb.net/shopDB?retryWrites=true&w=majority"
//Since we have set Mongodb atlas cluster to config var --> it is exposed to the application's code as environment variable 
const url = process.env.MONGODB_URI;
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
.then(success => console.log("Connected to database"))
.catch(err => console.log(err))
//define functions, variables, db schema etc
const itemSchema = new mongoose.Schema({
   item: String,
   quantity: Number
})

const List1 = mongoose.model("List1",itemSchema);

function getCollectionNames(){
   return mongoose.connection.db.listCollections().toArray() 
   .then(collectionArr => collectionArr.map(collection => collection.name))
   .catch(err => console.log(err))
}

function getDocs(modelName){
   return modelName.find()
   .then(docs => docs)
   .catch(err => console.log(err))
}

// functions in action
app.get("/",function(req,res){

let dbcollections = getCollectionNames();
let docs = getDocs(List1);
Promise.all([docs,dbcollections])
.then(values => res.render("index",{list: values[0],collections: values[1]}))
.catch(err => console.log(err))

})


app.post("/", function(req,res){
   const itemName = req.body.item;
   const quantityValue = req.body.quantity;
   
   if(itemName instanceof Array){

      for(let i = 0; i < itemName.length; i++){
         const query = {item: itemName[i].toLowerCase()};
         const update = {item: itemName[i].toLowerCase(),quantity: quantityValue[i]};
         List1.updateOne(query,update,{upsert:true},function(err){
            if(err){
               console.log(err)
            }else{
               console.log("successfully update many")
            }
         })
      }
   }else{
      List1.updateOne({item: itemName.toLowerCase()},{quantity: quantityValue},{upsert:true},function(err){
         if(err){
            console.log(err)
         }else{
            console.log("successfully update one")
         }
      })
   }
  
   res.redirect("/");
 
})



app.listen(process.env.PORT || 3000,function(){
   console.log("Server started on port 3000")
})