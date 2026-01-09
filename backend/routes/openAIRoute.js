import express from "express";
import gptController from "../controller/gptController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Test GPT
router.get("/test-gpt", gptController.testGPT);

// Recommend courses (logged-in users only)
router.get("/recommend", authMiddleware.verifyToken, gptController.recommendCourses);

export default router;
