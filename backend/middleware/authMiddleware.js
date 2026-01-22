import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log("token", token);

  if (!token) {
    return res.status(403).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    console.log("Admin only");
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

const userOnly = (req, res, next) => {
  if (req.user.role !== "user") {
    console.log("User only");
    return res.status(403).json({ message: "User only" });
  }
  next();
};

export default { verifyToken, adminOnly, userOnly };
