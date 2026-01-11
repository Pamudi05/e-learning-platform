import express from 'express';
import entrollController from '../controller/entrollController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/enroll', authMiddleware.verifyToken, entrollController.addToEntroll);
router.get('/getAllEntrollCourses', authMiddleware.verifyToken, entrollController.getUserEnrolledCourses);

export default router;