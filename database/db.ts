import dotenv from "dotenv";
dotenv.config();

//env파일에 들어있는 데이터 사용
const mysql = require("mysql2/promise");
const { USERNAME, PASSWORD, DATABASE, DB_HOST, DB_PORT } = process.env;

//db 연결
export const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE,
});
