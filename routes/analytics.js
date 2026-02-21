const express = require('express');
const router = express.Router();
const analyticsCtrl = require('../controllers/analyticsController');

router.get('/overview', analyticsCtrl.overview);
router.get('/usage', analyticsCtrl.usage);

module.exports = router;