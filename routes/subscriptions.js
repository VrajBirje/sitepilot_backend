const express = require('express');
const router = express.Router();
const subCtrl = require('../controllers/subscriptionController');

router.get('/plans', subCtrl.getPlans);
router.post('/', subCtrl.createSubscription);
router.get('/me', subCtrl.getMySubscription);
router.patch('/upgrade', subCtrl.upgrade);
router.patch('/cancel', subCtrl.cancel);
router.post('/webhook', subCtrl.webhook);

module.exports = router;