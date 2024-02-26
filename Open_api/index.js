"use strict";

// 모듈
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// router 모듈
const router = require("./src/routes/index");
const movieRouter = require("./src/routes/movieRouter");
const airRouter = require("./src/routes/airRouter");
const pharmacyRouter = require("./src/routes/pharmacyRouter");

const app = express();

app.use("/public", express.static(`${__dirname}/src/public`));

// 앱 세팅
app.set("view engine", "ejs");
app.set("views", `${__dirname}/src/views`);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우터
app.use("/", router);
app.use("/movie", movieRouter);
app.use("/air", airRouter);
app.use("/pharmacy", pharmacyRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running port ${port}`);
}); // port number
