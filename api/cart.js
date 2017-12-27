const express=require('express');
const route=express.Router()
const catalogue=require('../db/models').catalogue;


route.post('/getItems',(req,res)=>{
   let items=req.body.items;
   console.log(items);
   console.log(typeof items);
   b=JSON.parse(items);
   console.log(typeof b);
   console.log(b+`${b.length}`)
    let count=b.length;
   let ans=[];
   if(b.length!==0 || b===null)
   for(item of b)
   {
       catalogue.findOne(
           {
               where:{
                   title: item
               }

           }
       ).then((data)=>{
           // console.log(data)
           ans.push(data);
           if(ans.length===count)
           {
               console.log(ans)
               res.send(ans);
           }

       }).catch((err)=>{
           console.error(err);
       })
   }
   else
       res.send([])


});


exports.route=route;
