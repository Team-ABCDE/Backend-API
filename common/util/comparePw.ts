import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";

//.env　경로 설정
dotenv.config();

export const comparePw = async (
  req: Request,
  res: Response,
  user_pw: string
) => {
  await bcrypt
    .compare(user_pw, String(process.env.SECRET))
    .then(() => {
      return true;
    })
    .catch((err: Error) => {
      console.error(err);
      return res.status(404).json({ msg: "잘못된 접근입니다." });
    });
};
