const express=require('express');
const route=express.Router();
const catalogue=require('../db/models').catalogue;

route.get('/',express.static('../front_end/cart'));

exports.route=route;