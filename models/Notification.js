const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: String,
  type: { type: String, enum: ['system','billing','usage','user','deployment','domain','security','update'], required: true },
  subtype: String,
  severity: { type: String, enum: ['info','success','warning','error','critical'], default: 'info' },
  title: { type: String, required: true },
  message: String,
  htmlMessage: String,
  actionUrl: String,
  actionText: String,
  data: Object,
  isRead: { type: Boolean, default: false },
  readAt: Date,
  isArchived: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date,
  channels: {
    inApp: { type: Boolean, default: true },
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    webhook: { type: Boolean, default: false }
  },
  emailSentAt: Date,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now }
});

notificationSchema.index({ tenantId: 1, userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
notificationSchema.index({ type: 1, severity: 1 });

module.exports = mongoose.model('Notification', notificationSchema);