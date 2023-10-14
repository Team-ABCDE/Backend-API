import express, { Router } from "express";
import { changePwController } from "../controller/changePwController";

const router: Router = express.Router();

//url 입력했을때 실행되는 로직
export const postChangePw = router.post("/", changePwController);
