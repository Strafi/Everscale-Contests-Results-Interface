import express from 'express';
import { exportExcel } from '../controllers/index.js';

const router = express.Router();

router.post('/export-excel', exportExcel);

export default router;
