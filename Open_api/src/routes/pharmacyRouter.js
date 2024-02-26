"use strict";

const express = require("express");
const pharmacyRouter = express.Router();

// controller 연결
const ctrl = require("../controllers/pharmacy");

// output
pharmacyRouter.get("/", ctrl.output.home);

// process
pharmacyRouter.get("/data", ctrl.process.data);

module.exports = pharmacyRouter;
