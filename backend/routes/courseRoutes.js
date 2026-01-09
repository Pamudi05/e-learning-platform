import express from 'express';
import courseController from '../controller/courseController.js'
import upload from "../util/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/create',upload.array('image', 2) , authMiddleware.verifyToken,authMiddleware.adminOnly, courseController.createCourse);


export default router;