import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log('verifyToken' , req.cookies.token)

  if (!token) {
    return res.status(403).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

const userOnly = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "User only" });
  }
  next();
};

export default { verifyToken, adminOnly, userOnly };
