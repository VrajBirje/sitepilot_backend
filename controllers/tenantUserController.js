const TenantUser = require('../models/TenantUser');

exports.listUsers = async (req, res, next) => {
  res.json({ success: true, data: {} });
};

exports.inviteUser = async (req, res, next) => {
  res.status(201).json({ success: true, data: {} });
};

exports.changeRole = async (req, res, next) => {
  res.json({ success: true, data: {} });
};

exports.removeUser = async (req, res, next) => {
  res.json({ success: true, message: 'User removed from tenant successfully' });
};
