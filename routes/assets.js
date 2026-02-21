const express = require('express');
const router = express.Router();
const assetCtrl = require('../controllers/assetController');

router.post('/upload', assetCtrl.uploadAsset);
router.get('/', assetCtrl.listAssets);
router.delete('/:assetId', assetCtrl.deleteAsset);

module.exports = router;