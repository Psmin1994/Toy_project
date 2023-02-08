import express from "express";
import bodyParser from "body-parser";

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터
app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      img: "https://placeimg.com/120/120/1",
      name: "홍길동",
      birthday: "940716",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 2,
      img: "https://placeimg.com/120/120/2",
      name: "박찬희",
      birthday: "001126",
      gender: "남자",
      job: "야구선수",
    },
    {
      id: 3,
      img: "https://placeimg.com/120/120/3",
      name: "박상민",
      birthday: "940716",
      gender: "남자",
      job: "프로그래머",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Server run in ${port}`);
});
