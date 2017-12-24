const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');

const routes={
    admin:require('./api/admin').route,
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin',routes.admin);

app.use('/',express.static(path.join(__dirname,'front_end','admin')))

app.listen(2345,()=>{
console.log('Server on at http://localhost:2345/');
});