const express = require("express");
const { LightModel} = require("../models/light.model");

const lightRoutes = express.Router();

lightRoutes.get("/product", async (req, res) => {
  const sort = req.query.sort;
  try {
    const products = await LightModel.find();
    res.send(products);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

lightRoutes.post("/product/add", async (req, res) => {
  const payload = req.body;
  payload.img = payload.img.split(",");
  payload.cashback = payload.price - payload.discountPrice;
  payload.off = Math.floor(
    ((payload.price - payload.discountPrice) / payload.price) * 100
  );
  try {
    const product = new LightModel(payload);
    const added_product = await product.save();
    res.send(added_product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

module.exports = { lightRoutes };
