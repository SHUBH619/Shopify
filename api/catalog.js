const express=require('express');
const route=express.Router();
const catalogue=require('../db/models').catalogue;

route.get('/getItems',(req,res)=>{
    res.redirect('/admin/task/getItems');
})
exports.route=route;