// jwtUtils.js
import jwt from "jsonwebtoken";

const secretKey =
  "eyJhbGciOiJiUzl1NilsInR5cCl6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluliwibmJmljoxNzE2NTQxMjU1LCJIeHAiOjE3MTcxNDYwNTUsIm|hdCl6MTCXNjUOMTI1NX0.sBdhjd2eF|kOHH_gXUHqKSjdDHocf_hqOtMguketl60";

export const generateJwt = (payload) => {
  const options = {
    username: "admin",
    psasword: "via",
  };
  return jwt.sign(payload, secretKey, options);
};

export const verifyJwt = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    console.error("JWT verification failed:", e);
    return null;
  }
};
