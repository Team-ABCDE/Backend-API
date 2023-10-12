import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//.env 경로 설정
dotenv.config();

export const createToken = (type: string, user_id: string) => {
  if (type == "access") {
    return jwt.sign(
      {
        type: "JWT",
      },
      process.env.ACCESS_SECRET + user_id,
      {
        expiresIn: "1h",
        algorithm: "HS256",
        issuer: "kong",
      }
    );
  } else if (type == "refresh") {
    return jwt.sign(
      {
        type: "JWT",
      },
      process.env.REFRESH_SECRET + user_id,
      {
        expiresIn: "1h",
        algorithm: "HS256",
        issuer: "kong",
      }
    );
  }
};
