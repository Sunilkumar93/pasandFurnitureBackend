const express = require("express")
const { KitchenModel } = require("../models/furnitureSchema")




const KitchenRouter = express.Router()


KitchenRouter.get("/",async (req, res) => {
   // const data = req.body
    try {
       const furniture = await KitchenModel.find()
        console.log(furniture)
        res.send(furniture)
    }
    catch (err) {
        res.send({ "msg": "Could not get furniture" })
    }
})


KitchenRouter.post("/add",async(req,res)=>{
    try{
        let data = req.body;
        data.img=data.img.split(",")
        data.cashback=data.price - data.discountPrice
        data.off=Math.floor(((data.price-data.discountPrice)/ data.price)* 100)
        console.log(data)
        let furniture = new KitchenModel(data);
        await furniture.save();
        res.send(furniture);
        console.log(furniture);
    }
    catch(err){
        res.send({"msg":"could not add furniture"})
    }
})




module.exports = {
    KitchenRouter
}