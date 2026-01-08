import express from "express";
import dotenv from "dotenv";

import openAiRouter from './routes/openAIRoute.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/openai/", openAiRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running port 5000`)
})
