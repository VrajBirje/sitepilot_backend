const express = require('express');
const router = express.Router();
const compCtrl = require('../controllers/componentController');

router.get('/pages/:pageId/components', compCtrl.listComponents);
router.post('/pages/:pageId/components', compCtrl.addComponent);
router.put('/components/:componentId', compCtrl.updateComponent);
router.delete('/components/:componentId', compCtrl.deleteComponent);

module.exports = router;