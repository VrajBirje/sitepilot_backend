const mongoose = require('mongoose');

const customPermissionSchema = new mongoose.Schema({
  resource: String,
  actions: [String]
});

const tenantUserSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['owner','admin','editor','developer','viewer'], required: true },
  customPermissions: [customPermissionSchema],
  invitationStatus: { type: String, enum: ['pending','accepted','expired','revoked'], default: 'accepted' },
  invitationToken: String,
  invitationExpires: Date,
  invitedAt: Date,
  joinedAt: Date,
  lastActiveAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

tenantUserSchema.index({ tenantId: 1, userId: 1 }, { unique: true });
tenantUserSchema.index({ tenantId: 1, role: 1 });
tenantUserSchema.index({ userId: 1 });
tenantUserSchema.index({ invitationToken: 1 }, { sparse: true });

module.exports = mongoose.model('TenantUser', tenantUserSchema);