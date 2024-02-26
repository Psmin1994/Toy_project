"use strict";

const express = require("express");
const movieRouter = express.Router();

// controller 연결
const ctrl = require("../controllers/movie");

// output
movieRouter.get("/", ctrl.output.home);

module.exports = movieRouter;
