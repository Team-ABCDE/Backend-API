import { pool } from "../database/db";
import { insertTokenModel } from "../models/insertTokenModel";

export const insertTokenController = (refreshToken: any, user_id: string) => {
  return pool
    .query(insertTokenModel, [refreshToken, user_id])
    .then(() => {
      return true;
    })
    .catch((err: Error) => {
      console.error(err);
      return false;
    });
};
