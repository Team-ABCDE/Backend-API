import { Request, Response } from "express";
import { pool } from "../database/db";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { postSigninModel } from "../models/postSigninModel";
import { idRegex, pwRegex } from "../common/util/regex";
import { userDto } from "../interface/userDto";
import { createToken } from "../common/util/createToken";
import { refreshTokenController } from "./refreshTokenController";
import { checkAuthModel } from "../models/checkAuthModel";

//.env 경로 설정
dotenv.config();

export const checkAuthController = async (req: Request, res: Response) => {
  const refresh = req.query.refresh;
  try {
    await pool
      .query(checkAuthModel, refresh)
      .then((value: any) => {
        //access 토큰 재발급
        let accessToken = createToken("access", value[0][0].user_id);
        //응답쿠키로 재발급 받은 access토큰 보내기
        res.cookie("accessToken", accessToken, {
          maxAge: 1800000,
        });
        //응답코드 내려주기
        return res.status(200).json({ msg: "토큰 재발급이 완료되었습니다." });
      })
      .catch((err: Error) => {
        console.log("토큰 체크 모델 호출 실패");
        res.status(404).json({ msg: "잘못된 접근입니다." });
      });
  } catch (error) {
    console.log("인증 실패");
    console.error(error);
    res.status(404).json({ msg: "잘못된 접근입니다." });
  }
};
