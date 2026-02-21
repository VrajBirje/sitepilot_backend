const express = require('express');
const router = express.Router();
const pubCtrl = require('../controllers/publicController');

router.get('/:websiteSlug', pubCtrl.getWebsiteData);

module.exports = router;