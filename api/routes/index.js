const express = require('express');
const { exportExcel } = require ('../controllers/index.js');

const router = express.Router();

router.post('/export-excel', exportExcel);

module.exports = router;
