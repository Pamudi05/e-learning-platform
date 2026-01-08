import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./db/dbConnection.js";

import openAiRouter from './routes/openAIRoute.js'

dotenv.config();

const app = express();
app.use(express.json());
connectToDatabase();
app.use(cors());

app.use("/api/v1/openai/", openAiRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
})
