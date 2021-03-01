import express from "express";
import mongoose from "mongoose";
import {List1} from "./server.js"
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.delete("/", function(req, res, next){
const query = {"item" : req.query.itemName};
removeFromDB(query);
next();
res.redirect("/")
})


function removeFromDB(param){
    List1.deleteOne(param,function(err){
        err? console.log(err) : console.log("delete one item")
    })
}

export {router as deleteRouter}