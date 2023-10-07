import express, { Router, Request, Response } from "express";
import { pool } from "../database/db";
import { getDefaultType } from "../interface/getDefaultType";
import { getDefaultSql } from "../models/getDefaultSql";

const router: Router = express.Router();

//url 입력했을때 실행되는 로직
export const getDefault = router.get(
  "/",
  async (req: Request, res: Response) => {
    try {
      await pool
        .query(getDefaultSql, "")
        .then((value: getDefaultType[][]) => {
          return res.status(200).json(value[0][0]);
        })
        .catch((error: Error) => {
          res.status(404).json({ msg: error });
        });
    } catch (error) {
      return console.error(error);
    }
  }
);
