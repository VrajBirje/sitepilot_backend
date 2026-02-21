const express = require('express');
const router = express.Router();
const aiCtrl = require('../controllers/aiController');

router.post('/generate-layout', aiCtrl.generateLayout);
router.post('/generate-content', aiCtrl.generateContent);
router.post('/improve-content', aiCtrl.improveContent);

module.exports = router;