import express from 'express';
import { saveFund, getSavedFunds, removeFund } from '../controllers/fundController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', authMiddleware, saveFund);
router.get('/saved', authMiddleware, getSavedFunds);
router.delete('/remove', authMiddleware, removeFund);

export default router;
