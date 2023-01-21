const mongoose = require("mongoose");

const OrdredSchema = new mongoose.Schema({
  img: [String],
  desc: String,
  brand: String,
  type: String,
  price: Number,
  discountPrice: Number,
  cashback: Number,
  off: Number,
  warranty: Number,
  userName: String,
  quantity: Number,
  userId: String,
  userType: String,
});

const OrderModel = mongoose.model("orderedItem", OrdredSchema);

module.exports = { OrderModel };
