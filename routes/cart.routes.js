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

cartRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await CartModel.findByIdAndDelete(id);
    res.send({ msg: "deleted successfully", error: false });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong while deleteing item from cart",
    });
  }
});
cartRouter.update("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
   const updated= await CartModel.findByIdAndUpdate({_id,id},payload);
    res.send({ data: updated, error: false });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong while updating item from cart",
    });
  }
});

module.exports = { cartRouter };
