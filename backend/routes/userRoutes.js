import express from 'express';
import userController from '../controller/UserController.js';

const router = express.Router();

router.post('/create', userController.createUser);

export default router;