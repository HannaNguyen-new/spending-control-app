import express from "express";
import mongoose from "mongoose";

const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.delete("/", function(req, res){
const query = {"item" : req.query.itemName};
removeFromDB(query)
})

function removeFromDB(param){
    List1.deleteOne(param)
}

export{router as deleteRouter}