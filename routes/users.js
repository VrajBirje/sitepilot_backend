const express = require('express');
const router = express.Router();
const userController = require('../controllers/tenantUserController');

router.get('/', userController.listUsers);
router.post('/invite', userController.inviteUser);
router.patch('/:userId/role', userController.changeRole);
router.delete('/:userId', userController.removeUser);

module.exports = router;