import { idMailer } from "../common/util/idMailer";
import { Request, Response } from "express";
import { pool } from "../database/db";
import { getEmailModel } from "../models/getEmailModel";

export const mailController = async (req: Request, res: Response) => {
  let email = req.body.email;
  let txt = req.body.txt;

  console.log("check email=> ", req.body.email);

  //이메일 이용해서 유저 정보 확인
  let getEmail = await pool.query(getEmailModel, email);
  console.log("check getEmail => ", getEmail[0][0]);
  //텍스트 값에 따라 이메일 전송 함수 분기처리
  if (txt === "fi") {
    idMailer(getEmail[0][0].name, getEmail[0][0].email)
      .then(() => {
        res.status(200).json({ msg: "메일 전송 완료되었습니다." });
      })
      .catch((err: Error) => {
        console.log("메일 전송 에러");
        console.error(err);
        res.status(404).json({ msg: "잘못된 접근 입니다." });
      });
  }
};
