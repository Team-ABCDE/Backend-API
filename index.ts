import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { postSignup } from "./routes/postSignup";
import { postSignin } from "./routes/postSignin";
import { postSignout } from "./routes/postSignout";
import { checkAuth } from "./routes/checkAuth";

//.env 경로 설정
dotenv.config();

const app: Application = express();
const http = require("http");

//기본적인 express 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//라우터 코드 가져오는 부분
app.use("/signup", postSignup);
app.use("/signin", postSignin);
app.use("/signout", postSignout);
app.use("/auth", checkAuth);

//서버 실행하는 부분
http.createServer(app).listen(process.env.PORT, () => {
  console.log("====== 서버 시작 ======");
});
