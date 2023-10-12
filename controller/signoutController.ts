import { Request, Response } from "express";
import { pool } from "../database/db";
import { removeRefreshModel } from "../models/removeRefreshModel";

export const signoutController = async (req: Request, res: Response) => {
  let refresh = req.body.refresh;
  try {
    //access, refresh 토큰 삭제
    await res.clearCookie("accessToken", {
      maxAge: 0,
      path: "/",
      domain: "localhost",
    });
    await res.clearCookie("refreshToken", {
      maxAge: 0,
      path: "/",
      domain: "localhost",
    });

    await pool
      .query(removeRefreshModel, [null, refresh])
      .then((value: any) => {
        res
          .status(200)
          .json({ user: value.refresh_token !== null ? true : false });
      })
      .catch((err: Error) => {
        console.log(err);
        res.status(404).json({ msg: "잘못된 접근입니다." });
      });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "잘못된 접근입니다." });
  }
};
