import express from "express";
import openai from "../config/openAI.js";

const router = express.Router();

router.get("/test-gpt", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Say hello in one sentence" },
        { role: "user", content: "Ask how can i help" }
      ],
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
