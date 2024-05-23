// src/jwt/jwtUtils.js
import jwt from "jsonwebtoken";

const secretKey = "123456789";

export const generateToken = () => {
  const token = jwt.sign(
    {
      id: "1",
      typ: "JWT",
      alg: "HS256",
    },
    secretKey,
    { expiresIn: "1h" }
  );
  localStorage.setItem("token", token);
  return token;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
