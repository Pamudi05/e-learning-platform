import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./db/dbConnection.js";
import cookieParser from "cookie-parser";

import openAiRouter from './routes/openAIRoute.js'
import authRouter from './routes/authRoutes.js'
import courseRouter from './routes/courseRoutes.js'
import userRouter from './routes/userRoute.js'
import entrollRouter from './routes/entrollRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(cookieParser());

app.use("/api/v1/openai/", openAiRouter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/course/", courseRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/enroll/", entrollRouter);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
})
