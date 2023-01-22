const express = require("express");
const { FurnitureModel } = require("../models/furniture.model");

// wardrobes, bed

const furnitureRouter = express.Router();

furnitureRouter.get("/product", async (req, res) => {
  const sort = req.query.sort;
  const filter = req.query.filter||"";
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
    if (filter.length>0) {
        const products = await FurnitureModel.find()
          .where("off")
          .gte(off)
          .sort(sortBy)
          .where("type")
          .in(filter);
        const count = await FurnitureModel.find()
          .where("off")
          .gte(off)
          .sort(sortBy)
          .where("type")
          .in(filter)
          .count();
  
        res.send({ data: products, total: count });
      } else {
        const count = await FurnitureModel.find()
          .where("off")
          .gte(off)
          .sort(sortBy)
          .count();
        const products = await FurnitureModel.find()
          .where("off")
          .gte(off)
          .sort(sortBy);
        res.send({ data: products, total: count });
      }
  } catch (err) {
    res.send({ msg: "Could not get furniture" });
  }
});

furnitureRouter.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const product = await FurnitureModel.findById(id);
      res.send(product);
    } catch (error) {
      res.status(404).send({ msg: "something went wrong" });
    }
  });

furnitureRouter.post("/add", async (req, res) => {
  try {
    let data = req.body;
    data.img = data.img.split(",");
    data.cashback = data.price - data.discountPrice;
    data.off = Math.floor(
      ((data.price - data.discountPrice) / data.price) * 100
    );
    console.log(data);
    let furniture = new FurnitureModel(data);
    await furniture.save();
    res.send(furniture);
    console.log(furniture);
  } catch (err) {
    res.send({ msg: "could not add furniture" });
  }
});

module.exports = {
  furnitureRouter,
};
