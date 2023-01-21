const express = require("express");
const { LightModel } = require("../models/light.model");

const lightRoutes = express.Router();

lightRoutes.get("/product", async (req, res) => {
  const sort = req.query.sort;
  const filter = req.query.filter;
  const off = +req.query.off || 0;

  let sortBy;
  if (sort == "price_low") {
    sortBy = { discountPrice: 1 };
  } else if (sort == "price_high") {
    sortBy = { discountPrice: -1 };
  } else {
    sortBy = { _id: 1 };
  }
  try {
    if (filter) {
      const products = await LightModel.find()
        .where("off")
        .gte(off)
        .sort(sortBy)
        .where("type")
        .in(filter);
      const count = await LightModel.find()
        .where("off")
        .gte(off)
        .sort(sortBy)
        .where("type")
        .in(filter)
        .count();

      res.send({ data: products, total: count });
    } else {
      const count = await LightModel.find()
        .where("off")
        .gte(off)
        .sort(sortBy)
        .count();
      const products = await LightModel.find()
        .where("off")
        .gte(off)
        .sort(sortBy);
      res.send({ data: products, total: count });
    }
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

lightRoutes.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await LightModelModel.findById(id);
    res.send(product);
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
