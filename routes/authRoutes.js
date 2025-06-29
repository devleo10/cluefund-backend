import express from 'express';
import { registerUser, loginUser, verifyToken } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verifyToken', verifyToken);

export default router;
