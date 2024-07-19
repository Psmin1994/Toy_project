import mysql from "mysql2/promise";

const pool = await mysql.createPool({
  host: process.env.DB_HOST, //실제로 연결할 데이터베이스의 위치
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, //데이터베이스 이름
  port: process.env.DB_PORT,
  connectionLimit: process.env.DB_CONN_LIMIT,
});

const conn = await pool.getConnection(async (conn) => conn);

export default conn;
