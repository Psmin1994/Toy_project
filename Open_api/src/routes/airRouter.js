"use strict";

const express = require("express");
const airRouter = express.Router();

// controller 연결
const ctrl = require("../controllers/air");

// output
airRouter.get("/", ctrl.output.home);
airRouter.get("/help", ctrl.output.help);
airRouter.get("/about", ctrl.output.about);

// process
airRouter.post("/post", ctrl.process.post);

module.exports = airRouter;
