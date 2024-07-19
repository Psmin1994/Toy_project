import express from "express";
import "dotenv/config";

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
import db from "./models/sequelize-config.js";
const app = express();

app.set("port", process.env.PORT || 8000);

try {
  await db.sequelize.sync();
  console.log("데이터베이스 연결됨.");
} catch (err) {
  console.log(err);
}

app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱

app.get("/", (req, res) => {
  console.log("hi");
  res.json({ message: "hello world" });
});

// 서버 실행
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
