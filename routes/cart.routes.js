const express = require("express");
const { CartModel } = require("../models/cart.model");

const cartRouter = express.Router();

cartRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = new CartModel(payload);
    await product.save();
    res.send({ error: false, msg: "added to cart" });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong while adding item to cart",
    });
  }
});

cartRouter.get("/product", async (req, res) => {
  const payload = req.body;
  try {
    const product = await CartModel.find({ userId: payload.userId });
    const count = await CartModel.find({ userId: payload.userId }).count();
    res.send({ data: product, total: count });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong while adding item to cart",
    });
  }
});

module.exports = { cartRouter };
