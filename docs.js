import express from "express";
import{getDocs}from "./server.js";
var router = express.Router();
router.use(express.urlencoded({extended:true}))
router.use(express.json());
// to get Docs in a chosen List (collections) route
router.get("/", function(req, res){
    getDocs(req.query.modelName)
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

export{router}