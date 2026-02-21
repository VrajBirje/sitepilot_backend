const express = require('express');
const router = express.Router();
const siteCtrl = require('../controllers/websiteController');

router.get('/', siteCtrl.listWebsites);
router.post('/', siteCtrl.createWebsite);
router.get('/:websiteId', siteCtrl.getWebsite);
router.put('/:websiteId', siteCtrl.updateWebsite);
router.delete('/:websiteId', siteCtrl.deleteWebsite);
router.post('/:websiteId/clone', siteCtrl.cloneWebsite);

module.exports = router;