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
import { insertTokenController } from "./insertTokenController";

//.env 경로 설정
dotenv.config();

export const signinController = async (req: Request, res: Response) => {
  try {
    //아이디, 비밀번호 유효성 검사
    if (idRegex.test(req.body.user_id) && pwRegex.test(req.body.user_pw)) {
      await pool
        .query(postSigninModel, req.body.user_id)
        .then((value: any) => {
          //비밀번호 검증
          bcrypt
            .compare(req.body.user_pw, value[0][0].user_pw)
            .then(async () => {
              //access 토큰 생성
              let accessToken = await createToken(
                "access",
                value[0][0].user_id
              );
              //refresh 토큰 생성
              let refreshToken = await createToken(
                "refresh",
                value[0][0].user_id
              );

              if (req.headers.cookie == undefined) {
                //refresh 토큰 db 저장
                let insertResult = await insertTokenController(
                  refreshToken,
                  value[0][0].user_id
                );
                if (insertResult) {
                  //응답쿠키에 넣어서 보냄
                  await res.cookie("accessToken", accessToken, {
                    maxAge: 1800000,
                  });
                  await res.cookie("refreshToken", refreshToken, {
                    maxAge: 3600000,
                  });

                  return res.status(200).json({
                    msg: "로그인 완료되었습니다.",
                    user: value[0][0].refresh_token !== null ? true : false,
                  });
                } else {
                  console.log("refresh token insert problem");
                  res.status(404).json({ msg: "잘못된 접근입니다." });
                }
              } else {
                console.log("already login user");
                res.status(404).json({ msg: "잘못된 접근입니다." });
              }
            })
            .catch((err: Error) => {
              console.log("compare not completed");
              console.error(err);
              res.status(404).json({ msg: "잘못된 접근입니다." });
            });
        })
        .catch((error: Error) => {
          console.log("select not completed");
          console.error(error);
          res.status(404).json({ msg: "잘못된 접근입니다." });
        });
    }
  } catch (error) {
    console.log("try catch problem");
    return console.error(error);
  }
  //아이디, 비밀번호 체크
};
