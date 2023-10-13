import { mailer } from "../common/util/mailer";
import { Request, Response } from "express";
import { pool } from "../database/db";
import { getEmailModel } from "../models/getEmailModel";

export const mailController = async (req: Request, res: Response) => {
  const email = req.body.email;

  let getEmail = await pool.query(getEmailModel, email);
  mailer(getEmail[0][0].name, getEmail[0][0].email)
    .then(() => {
      res.status(200).json({ msg: "메일 전송 완료되었습니다." });
    })
    .catch((err: Error) => {
      console.log("메일 전송 에러");
      console.error(err);
      res.status(404).json({ msg: "잘못된 접근 입니다." });
    });
};
