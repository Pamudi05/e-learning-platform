import express from 'express';
import entrollController from '../controller/entrollController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/addToenroll', authMiddleware.verifyToken, authMiddleware.userOnly, entrollController.addToEntroll);
router.get('/getAllEntrollCourses', authMiddleware.verifyToken, authMiddleware.userOnly, entrollController.getUserEnrolledCourses);
router.get("/getEnrollById/:userId/:courseId",authMiddleware.verifyToken, authMiddleware.userOnly, entrollController.getEnrollById);
router.get("/getAllEnrolledStudents",authMiddleware.verifyToken, authMiddleware.adminOnly, entrollController.getAllEnrolledStudents);

export default router;