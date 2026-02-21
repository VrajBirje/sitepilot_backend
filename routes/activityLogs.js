const express = require('express');
const router = express.Router();
const logCtrl = require('../controllers/activityLogController');

router.get('/', logCtrl.list);

module.exports = router;