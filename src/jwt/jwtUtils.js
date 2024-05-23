// jwtUtils.js
import jwt from "jsonwebtoken";

export const generateJwt = () => {
  const payload = {}; // You can add user-specific data here if needed
  const secretKey = "your_secret_key"; // Replace with your actual secret key
  const options = {
    expiresIn: "1h", // Token expires in 1 hour
  };
  return jwt.sign(payload, secretKey, options);
};
