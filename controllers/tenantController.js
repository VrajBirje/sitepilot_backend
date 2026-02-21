const Tenant = require('../models/Tenant');

exports.createTenant = async (req, res, next) => {
  res.status(201).json({ success: true, data: {} });
};

exports.getMyTenant = async (req, res, next) => {
  res.json({ success: true, data: {} });
};

exports.updateMyTenant = async (req, res, next) => {
  res.json({ success: true, data: {} });
};

exports.deleteMyTenant = async (req, res, next) => {
  res.json({ success: true, message: 'Tenant scheduled for deletion. Will be permanently deleted in 30 days.' });
};
