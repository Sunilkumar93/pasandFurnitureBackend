const mongoose = require("mongoose");

const homeDecorSchema = mongoose.Schema({
  img: [String],
  desc: String,
  brand: String,
  type: String,
  price: Number,
  discountPrice: Number,
  cashback: Number,
  off: Number,
  warranty: Number,
});

const HomeDecorModel = mongoose.model("homeDecor", homeDecorSchema);

module.exports = { HomeDecorModel };
