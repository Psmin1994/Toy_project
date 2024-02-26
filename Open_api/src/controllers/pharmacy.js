"use strict";

const pharmacyData = require("../models/pharmacyData");

const output = {
  home: (req, res) => {
    res.render("pharmacy/home", {
      name: "Psmin",
      email: "tkdals6405@gmail.com",
    });
  },
};

const process = {
  data: (req, res) => {
    pharmacyData(req.query, (data) => {
      return res.json(data);
    });
  },
};

module.exports = {
  // 객체 형태로 내보내기
  output,
  process,
};
