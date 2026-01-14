import express from 'express';
import contentController from '../controller/contentController.js'
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/addContent', authMiddleware.verifyToken,authMiddleware.adminOnly, contentController.createContent);
router.get('/getContentByCourse/:id', authMiddleware.verifyToken, contentController.getContentByCourse);

export default router;