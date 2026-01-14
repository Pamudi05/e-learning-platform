import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./db/dbConnection.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import openAiRouter from "./routes/openAIRoute.js";
import authRouter from "./routes/authRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import entrollRouter from "./routes/entrollRoutes.js";
import contentRouter from "./routes/contentRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.set("trust proxy", 1);

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/v1/openai/", openAiRouter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/course/", courseRouter);
app.use("/api/v1/enroll/", entrollRouter);
app.use("/api/v1/content/", contentRouter);

app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "../frontend/build");

  app.use(express.static(frontendBuildPath));

  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendBuildPath, "index.html"));
    } else {
      next();
    }
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
