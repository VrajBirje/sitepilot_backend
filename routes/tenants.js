const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

router.post('/', tenantController.createTenant);
router.get('/me', tenantController.getMyTenant);
router.put('/me', tenantController.updateMyTenant);
router.delete('/me', tenantController.deleteMyTenant);

module.exports = router;