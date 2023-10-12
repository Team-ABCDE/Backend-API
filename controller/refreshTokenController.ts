import { pool } from "../database/db";
import { refreshTokenModel } from "../models/refreshTokenModel";

export const refreshTokenController = (refreshToken: any) => {
  return pool
    .query(refreshTokenModel, [refreshToken, refreshToken])
    .then(() => {
      return true;
    })
    .catch((err: Error) => {
      console.error(err);
      return false;
    });
};
