const mongoose=require("mongoose")

const furnitureSchema=mongoose.Schema({
img:[String],
desc:String,
brand:String,
type:String,
price:Number,
discountPrice:Number,
cashback:Number,
off:Number,
warranty:Number
})

const FurnitureModel=mongoose.model("furniture", furnitureSchema)
const KitchenModel=mongoose.model("kitchen", furnitureSchema)




module.exports={
    FurnitureModel, KitchenModel
}