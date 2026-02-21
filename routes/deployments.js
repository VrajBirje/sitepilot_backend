const express = require('express');
const router = express.Router();
const deployCtrl = require('../controllers/deploymentController');

router.post('/websites/:websiteId/deploy', deployCtrl.deploy);
router.get('/websites/:websiteId/deployments', deployCtrl.listDeployments);
router.post('/deployments/:deploymentId/rollback', deployCtrl.rollback);

module.exports = router;