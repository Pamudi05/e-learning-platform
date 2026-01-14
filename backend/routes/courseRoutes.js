import express from 'express';
import courseController from '../controller/courseController.js'
import upload from "../util/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/create',upload.array('image', 2) , authMiddleware.verifyToken, authMiddleware.adminOnly, courseController.createCourse);
router.get('/findAll', authMiddleware.verifyToken, courseController.findAllCourses);
router.get('/findById/:id', authMiddleware.verifyToken, courseController.findById);
router.put('/update/:id',upload.array('image', 2), authMiddleware.verifyToken, authMiddleware.adminOnly, courseController.update);
router.delete('/delete/:id', authMiddleware.verifyToken, authMiddleware.adminOnly, courseController.deleteData);


export default router;