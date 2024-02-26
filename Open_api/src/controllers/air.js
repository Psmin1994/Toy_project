"use strict";

const path = require("path");
const airData = require("../models/airdata");
// const logger = require("../../config/logger");

const output = {
  home: (req, res) => {
    res.render("air/home", {
      title: "미세먼지 정보 앱",
      name: "Psmin",
      email: "tkdals6405@gmail.com",
    });
  },
  help: (req, res) => {
    res.render("air/help", {
      title: "미세먼지 정보 앱",
      name: "Psmin",
      email: "tkdals6405@gmail.com",
      message: "Hello",
    });
  },
  about: (req, res) => {
    res.render("air/about", {
      title: "미세먼지 정보 앱",
      name: "Psmin",
      email: "tkdals6405@gmail.com",
    });
  },
};

const process = {
  post: (req, res) => {
    airData(req.body.location, (air) => {
      return res.render("air/post", {
        title: "미세먼지 정보 앱",
        name: "Psmin",
        email: "tkdals6405@gmail.com",
        location: req.body.location,
        time: air.dataTime,
        pm10: air.pm10Value,
        pm25: air.pm25Value,
      });
    });
  },
};

module.exports = {
  // 객체 형태로 내보내기
  output,
  process,
};
