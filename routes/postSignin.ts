import express, { Router } from "express";
import { signinController } from "../controller/signinController";

const router: Router = express.Router();

//url 입력했을때 실행되는 로직
export const postSignin = router.post("/", signinController);
