const express = require('express');
const router = express.Router();
const hostCtrl = require('../controllers/hostController');

// POST /api/v1/host
router.post('/host', hostCtrl.createSubdomain);

module.exports = router;
