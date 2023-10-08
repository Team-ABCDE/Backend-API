import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { getDefault } from "./routes/getDefault";
import { postSignup } from "./routes/postSignup";

//.env 경로 설정
dotenv.config();

const app: Application = express();
const http = require("http");

//기본적인 express 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//라우터 코드 가져오는 부분
app.use("/signup", postSignup);

//서버 실행하는 부분
http.createServer(app).listen(process.env.PORT, () => {
  console.log("====== 서버 시작 ======");
});
