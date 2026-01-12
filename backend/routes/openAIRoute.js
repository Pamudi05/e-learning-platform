import express from "express";
import gptController from "../controller/gptController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/recommend", authMiddleware.verifyToken, gptController.recommendCourses);

export default router;
