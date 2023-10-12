import express, { Router } from "express";
import { signoutController } from "../controller/signoutController";

const router: Router = express.Router();

export const postSignout = router.post("/", signoutController);
