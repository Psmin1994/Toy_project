import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conn.connect();

// 라우터
app.get("/api/customers", (req, res) => {
  conn.query("SELECT * FROM customers", (err, rows, fields) => {
    if (err) console.log(err);
    else res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Server run in ${port}`);
});
