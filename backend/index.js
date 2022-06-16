const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Product = require("./db/Product")
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register",async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    // resp.send(result); 
    // Making secure registration
    result = result.toObject();
    delete result.password
    resp.send(result)
})



app.post("/add-product", async (req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    console.log(result);
})

app.post("/login", async (req,resp) => {
    
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
    if(user){
        resp.send(user)
    }else{
        resp.send({result:"No Result Found!"})
    }
    }else{
        resp.send({result:"No User Found"})
    }
});



app.get("/products", async  (req,resp) => {

   
    const products = await Product.find();
    if(products.length > 0){
        resp.send(products)
    }else{
        resp.send({result: "NO Product Found!"})
    }
    
});

app.listen(9800);