const express = require("express")
const { FurnitureModel } = require("../models/furnitureSchema")


// wardrobes, bed 

const furnitureRouter = express.Router()


furnitureRouter.get("/",async (req, res) => {
   // const data = req.body
    try {
       const furniture = await FurnitureModel.find()
        console.log(furniture)
        res.send(furniture)
    }
    catch (err) {
        res.send({ "msg": "Could not get furniture" })
    }
})


furnitureRouter.post("/add",async(req,res)=>{
    try{
        let data = req.body;
        data.img=data.img.split(",")
        data.cashback=data.price - data.discountPrice
        data.off=Math.floor(((data.price-data.discountPrice)/ data.price)* 100)
        console.log(data)
        let furniture = new FurnitureModel(data);
        await furniture.save();
        res.send(furniture);
        console.log(furniture);
    }
    catch(err){
        res.send({"msg":"could not add furniture"})
    }
})




module.exports = {
    furnitureRouter
}