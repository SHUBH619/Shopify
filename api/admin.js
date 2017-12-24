const express=require('express');
const route=express.Router();
const catalogue=require('../db/models').catalogue;


route.get('/',(req,res)=>{
    catalogue.findAll().then((items)=>{
        res.send(items)
    })
        .catch((err)=>{
            console.log("Could not fetch items because"+err.message);
        })
});

route.post('/addItem',(req,res)=>{

    catalogue.create({
        title:req.body.title,
        // imagePath:`./images/`,
        price:req.body.price,
        description:req.body.description
    })
        .then(()=>{
            form.parse(req);
            res.redirect('.');
        })
        .catch((err)=>{
            console.log(err);
        });
});

exports.route=route;
