const express=require('express');
const route=express.Router();
const catalogue=require('../db/models').catalogue;
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './front_end/admin/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).single('image');


route.get('/',(req,res)=>{
    catalogue.findAll().then((items)=>{
        res.send(items)
    })
        .catch((err)=>{
            console.log("Could not fetch items because"+err.message);
        })
});

route.post('/addItem',(req,res)=>{

    upload(req, res, function (err) {
        if (err) {
            console.log(err);
        }
        console.log(req.file);
        catalogue.create({
            title:req.body.title,
            imagePath:`./uploads/${req.file.filename}`,
            price:req.body.price,
            des:req.body.des
        })
            .then(()=>{
                res.redirect('.');
            })
            .catch((err)=>{
                console.log(err);
            });

    })

});

exports.route=route;
