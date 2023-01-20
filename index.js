const express = require("express");
const { connect } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");
const { homeDecorRoutes } = require("./routes/homeDocor.routes");
const { furnitureRouter}=require("./routes/furnitureRoute")



const app = express();
app.use(cors());
app.use(express.json());


//routes
app.use("/homeDecor", homeDecorRoutes);
app.use("/fur", furnitureRouter)



app.listen(process.env.port, async () => {
  try {
    await connect;
    console.log("connected to data base");
  } catch (err) {
    console.log(`err while starting the  port on ${process.env.port}`);
  }

  console.log(`connected to server on  ${process.env.port}`);
});
