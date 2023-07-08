import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morganMiddleware from "./src/middleware/morgan.js";
import userRouter from "./src/routes/route_user.js";
import passport from "passport";
import passportConfig from "./src/config/passport/Strategy.js"; // JWT 방식 구현
// import sessionMiddleware from "./src/middleware/session.js"; // session 방식 구현
// import passportConfig from "./src/config/passport/index.js"; // session 방식 구현

const app = express();
const __dirname = path.resolve();

// 정적 파일
app.use("/", express.static(`${__dirname}/src/public`));

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

// 미들웨어
app.use(morganMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// passport
// app.use(sessionMiddleware); // session 방식 구현
app.use(passport.initialize());
// app.use(passport.session()); // session 방식 구현
passportConfig();

// router
app.use("/user", userRouter);

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    msg: "Server Error!!",
    error: err,
  });
});

// 3000 포트로 서버 오픈
app.listen(3000, () => {
  console.log("express server on port 3000");
});
