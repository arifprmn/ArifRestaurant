require("dotenv").config();

const express = require("express");
const cors = require("cors");
const midtransClient = require("midtrans-client");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const port = process.env.PORT || 3000;
const router = require("./routers/routes");

// MIDDLEWARES
const axios = require("axios");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(router);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Running with port :${port}`);
});
