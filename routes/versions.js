const express = require('express');
const router = express.Router();
const verCtrl = require('../controllers/versionController');

router.get('/pages/:pageId/versions', verCtrl.listVersions);
router.post('/pages/:pageId/versions', verCtrl.createVersion);
router.post('/pages/:pageId/versions/:versionId/restore', verCtrl.restoreVersion);

module.exports = router;