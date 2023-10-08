import jwt from "jsonwebtoken";

export const createToken = (type: string, user_id: string) => {
  if (type == "access") {
    return jwt.sign(
      {
        type: "JWT",
      },
      user_id,
      {
        expiresIn: "30m",
        algorithm: "HS256",
        issuer: "kong",
      }
    );
  } else if (type == "refresh") {
    return jwt.sign(
      {
        type: "JWT",
      },
      user_id,
      {
        expiresIn: "1h",
        algorithm: "HS256",
        issuer: "kong",
      }
    );
  }
};
