const express = require("express");
const { KitchenModel } = require("../models/furnitureSchema");

const KitchenRouter = express.Router();

KitchenRouter.get("/", async (req, res) => {
  // const data = req.body
  try {
    const furniture = await KitchenModel.find();
    res.send(furniture);
  } catch (err) {
    res.send({ msg: "Could not get furniture" });
  }
});

KitchenRouter.post("/add", async (req, res) => {
  try {
    let data = req.body;
    data.img = data.img.split(",");
    data.cashback = data.price - data.discountPrice;
    data.off = Math.floor(
      ((data.price - data.discountPrice) / data.price) * 100
    );

    let furniture = new KitchenModel(data);
    await furniture.save();
    res.send(furniture);
  } catch (err) {
    res.send({ msg: "could not add furniture" });
  }
});

module.exports = {
  KitchenRouter,
};
