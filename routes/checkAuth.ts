import express, { Router, Request, Response } from "express";
import { signinController } from "../controller/signinController";
import { checkAuthController } from "../controller/checkAuthController";

const router: Router = express.Router();

//url 입력했을때 실행되는 로직
export const checkAuth = router.get("/", checkAuthController);
