const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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

const CartModel = mongoose.model("cartItem", cartSchema);

module.exports = { CartModel };
