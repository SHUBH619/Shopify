const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');

const routes={
    admin:require('./api/admin').route,
    catalog:require('./api/catalog').route,
    cart:require('./api/cart').route
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin/task',routes.admin);
app.use('/catalog/task',routes.catalog);
app.use('/cart/task',routes.cart);

app.use('/admin',express.static('./front_end/admin'));
app.use('/catalog',express.static('./front_end/catalog'));
app.use('/cart',express.static('./front_end/cart'));

app.use((req,res)=>{
    res.send('<a href="http://localhost:2345/admin">ADMIN</a><br><a href="http://localhost:2345/catalog">SHOPIFY STORE</a><br><a href="http://localhost:2345/cart">Cart</a>')
})

app.listen(2345,()=>{
console.log('Server on at http://localhost:2345/');
});