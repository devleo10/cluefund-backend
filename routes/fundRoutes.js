import express from 'express';
import { saveFund, getSavedFunds } from '../controllers/fundController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveFund);
router.get('/saved', authMiddleware, getSavedFunds);

export default router;
