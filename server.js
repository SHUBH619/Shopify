const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');

const routes={
    admin:require('./api/admin').route,
    catalog:require('./api/catalog').route
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin/task',routes.admin);
app.use('/catalog',routes.admin);

app.use('/admin',express.static('./front_end/admin'));
app.listen(2345,()=>{
console.log('Server on at http://localhost:2345/');
});