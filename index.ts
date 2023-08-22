import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

//.env 경로 설정
dotenv.config();

const app: Application = express();
const http = require("http");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//서버 실행하는 부분
http.createServer(app).listen(process.env.PORT, () => {
  console.log("====== 서버 시작 ======");
});
