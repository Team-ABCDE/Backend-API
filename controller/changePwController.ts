import { Request, Response } from "express";
import { pool } from "../database/db";
import dotenv from "dotenv";
import { emailRegex, pwRegex } from "../common/util/regex";
import bcrypt from "bcrypt";
import { changePwModel } from "../models/changePwModel";

//.env 경로 설정
dotenv.config();

export const changePwController = async (req: Request, res: Response) => {
  const newPw = req.body.newPw;
  const newPwConfirm = req.body.newPwConfirm;
  const email = req.body.email;

  console.log("check new pw => ", newPw);
  console.log("check new pw confirm => ", newPwConfirm);
  try {
    if (
      pwRegex.test(newPw) &&
      pwRegex.test(newPwConfirm) &&
      emailRegex.test(email)
    ) {
      if (newPw === newPwConfirm) {
        //비밀번호 암호화
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        req.body.newPw = await bcrypt.hash(req.body.newPw, salt);
        console.log(req.body.newPw);
        console.log(email);
        await pool
          .query(changePwModel, [req.body.newPw, email])
          .then((value: any) => {
            console.log(value[0].affectedRows);
            value[0].affectedRows === 1
              ? res.status(200).json({ msg: "바말번호 변경이 완료되었습니다." })
              : res.status(404).json({ msg: "잘못된 접근입니다." });
          })
          .catch((err: Error) => {
            console.log("비밀번호 변경 실패");
            res.status(404).json({ msg: "잘못된 접근입니다." });
          });
      } else {
        console.log("비밀번호 일치 에러");
        res.status(404).json({ msg: "잘못된 접근입니다." });
      }
    } else {
      console.log("비밀번호 정규식 에러");
      res.status(404).json({ msg: "잘못된 접근입니다." });
    }
  } catch (error) {
    console.log("컨트롤러 접근 실패");
    console.error(error);
    res.status(404).json({ msg: "잘못된 접근입니다." });
  }
};
