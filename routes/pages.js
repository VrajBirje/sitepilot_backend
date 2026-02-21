const express = require('express');
const router = express.Router();
const pageCtrl = require('../controllers/pageController');

router.get('/websites/:websiteId/pages', pageCtrl.listPages);
router.post('/websites/:websiteId/pages', pageCtrl.createPage);
router.get('/pages/:pageId', pageCtrl.getPage);
router.put('/pages/:pageId', pageCtrl.updatePage);
router.patch('/pages/:pageId/publish', pageCtrl.publishPage);

module.exports = router;