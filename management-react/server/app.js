import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터
app.get("/api/customers", (req, res) => {});

app.listen(port, () => {
  console.log(`Server run in ${port}`);
});
