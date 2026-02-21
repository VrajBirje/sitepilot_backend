const express = require('express');
const router = express.Router();
const versionCtrl = require('../controllers/websiteVersionController');

// store index.html / html version
router.post('/websites/:websiteId/html-versions', versionCtrl.createHtmlVersion);
router.get('/websites/:websiteId/html-versions', versionCtrl.listHtmlVersions);
router.get('/websites/:websiteId/html-versions/:versionId', versionCtrl.getHtmlVersion);

module.exports = router;