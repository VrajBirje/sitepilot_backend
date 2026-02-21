const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  action: { type: String, required: true, enum: [
      'login','logout','password_change','mfa_enable',
      'tenant.create','tenant.update','tenant.delete',
      'user.invite','user.role_change','user.remove',
      'website.create','website.update','website.delete','website.publish','website.unpublish',
      'page.create','page.update','page.delete','page.publish','page.version_restore',
      'component.create','component.update','component.delete',
      'ai.generate','ai.optimize','ai.suggest',
      'asset.upload','asset.delete','asset.update',
      'domain.add','domain.verify','domain.remove',
      'deploy.start','deploy.success','deploy.fail','deploy.rollback',
      'subscription.upgrade','subscription.downgrade','subscription.cancel','payment.process',
      'settings.update','branding.update'
    ] },
  entityType: { type: String, enum: ['tenant','user','website','page','component','asset','domain','deployment','subscription','setting','ai_log'] },
  entityId: mongoose.Schema.Types.ObjectId,
  changes: { before: Object, after: Object, diff: Object },
  ipAddress: String,
  userAgent: String,
  sessionId: String,
  requestId: String,
  location: { country: String, city: String, coordinates: { lat: Number, lng: Number } },
  metadata: Object,
  status: { type: String, enum: ['success','failure','pending'], default: 'success' },
  errorMessage: String,
  duration: Number,
  createdAt: { type: Date, default: Date.now, expires: 31536000 }
});

activityLogSchema.index({ tenantId: 1, createdAt: -1 });
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ entityType: 1, entityId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });
activityLogSchema.index({ requestId: 1 }, { sparse: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);