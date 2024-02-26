"use strict";

const express = require("express");
const routes = require("./url");
const router = express.Router();

// output
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
