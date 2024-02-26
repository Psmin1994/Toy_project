"use strict";

// const User = require("../../models/");
// const logger = require("../../config/logger");

const output = {
  home: (req, res) => {
    //브라우저의 요청
    // logger.info(`GET / 304 "홈 화면으로 이동"`);
    res.render("movie/home");
  },

  sort_categories: (req, res) => {
    //브라우저의 요청
    // logger.info(`GET /login 304 "로그인 화면으로 이동"`);
    res.render("movie/sort_categories");
  },

  sort_year: (req, res) => {
    // logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
    res.render("movie/sort_year");
  },
  post: (req, res) => {
    // Logger
    res.render("movie/post");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();

    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 200,
    };
    log(response, url);
    return res.status(url.status).json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 400 : 201,
    };
    log(response, url);
    return res.status(url.status).json(response);
  },
};

module.exports = {
  // 객체 형태로 내보내기
  output,
  process,
};

// const log = (response, url) => {
//   if (response.err) {
//     logger.error(`${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}"`);
//   } else {
//     logger.info(`${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg || ""}`);
//   }
// };
