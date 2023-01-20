const express = require("express");
const { HomeDecorModel } = require("../models/homeDecor.model");

const homeDecorRoutes = express.Router();

homeDecorRoutes.get("/product", async (req, res) => {
  const sort = req.query.sort;
  try {
    const products = await HomeDecorModel.find();
    res.send(products);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

homeDecorRoutes.post("/product/add", async (req, res) => {
  const payload = req.body;
  payload.img = payload.img.split(",");
  payload.cashback = payload.price - payload.discountPrice;
  payload.off = Math.floor(
    ((payload.price - payload.discountPrice) / payload.price) * 100
  );
  try {
    const product = new HomeDecorModel(payload);
    const added_product = await product.save();
    res.send(added_product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

module.exports = { homeDecorRoutes };
