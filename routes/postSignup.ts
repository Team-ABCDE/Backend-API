import express, { Router } from "express";
import { signupController } from "../controller/signupController";

const router: Router = express.Router();

//메소드 타입 받고 컨트롤러로 전달
export const postSignup = router.post("/", signupController);
