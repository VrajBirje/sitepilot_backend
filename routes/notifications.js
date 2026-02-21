const express = require('express');
const router = express.Router();
const notifCtrl = require('../controllers/notificationController');

router.get('/', notifCtrl.list);
router.patch('/:notificationId/read', notifCtrl.markRead);

module.exports = router;