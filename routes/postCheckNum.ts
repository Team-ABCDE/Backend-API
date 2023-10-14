import express, { Router } from "express";
import { mailController } from "../controller/mailController";
import { checkNumController } from "../controller/checkNumController";

const router: Router = express.Router();

//url 입력했을때 실행되는 로직
export const postCheckNum = router.post("/", checkNumController);
