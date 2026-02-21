const express = require('express');
const router = express.Router();
const domCtrl = require('../controllers/domainController');

router.get('/websites/:websiteId/domains', domCtrl.listDomains);
router.post('/websites/:websiteId/domains', domCtrl.addDomain);
router.post('/domains/:domainId/verify', domCtrl.verifyDomain);
router.patch('/domains/:domainId/set-primary', domCtrl.setPrimary);

module.exports = router;