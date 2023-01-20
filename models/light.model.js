const mongoose = require("mongoose");

const lightSchema = new mongoose.Schema({
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

const LightModel = mongoose.model("light", lightSchema);

module.exports = { LightModel };
