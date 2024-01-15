const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const router = require("./routes/admin.route.js");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieparser());

app.use(bodyParser.json());
const mongooseconnection = mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("mongodb connection established");
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/api/admin", router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode;
  const message = err.message;
  return res.status(400).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("port running on", process.env.PORT);
});
