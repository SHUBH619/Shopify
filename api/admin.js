const express=require('express');
const route=express.Router();
const catalogue=require('../db/models').catalogue;
const multer = require('multer');
const fs=require('fs');

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
            console.error(err);
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
                console.error(err);
            });

    })

});

route.post('/deleteItem',(req,res)=>{
    fs.unlink(('./front_end/admin'+(req.body.imagePath).slice(1)),function (err) {
        if(err)
            console.error(err);
        console.log('deleted');
        catalogue.destroy({
            where:{
                title:req.body.title
            }
        }).then(()=>{
            res.redirect('.');
        }).catch((err)=>{
            console.error(err);
        })
    })
})
exports.route=route;
