import { Request, Response } from "express";
import { pool } from "../database/db";
import { postSignupModel } from "../models/postSignupModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { checkUserInfo } from "../common/util/checkUserInfo";

//.env 경로 설정
dotenv.config();

//실질적인 로직이 구현되는 컨트롤러 부분
export const signupController = async (req: Request, res: Response) => {
  //유효성 검사
  if (checkUserInfo(req.body)) {
    //비밀번호 암호화
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    req.body.user_pw = await bcrypt.hash(req.body.user_pw, salt);
    //sql 적용
    try {
      await pool
        .query(postSignupModel, Object.values(req.body))
        .then(() => {
          return res.status(201).json({ msg: "회원가입 완료되었습니다." });
        })
        .catch((error: Error) => {
          console.error(error);
          res.status(404).json({ msg: "잘못된 접근입니다." });
        });
    } catch (error) {
      return console.error(error);
    }
  } else {
    console.log("정규식 통과 못함.");
    res.status(404).json({ msg: "잘못된 정보입니다." });
  }
};
