const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  industry: { type: String, enum: [
      'restaurant','retail','education','healthcare','technology','realestate','creative','professional','nonprofit','other'
    ], required: true },
  description: String,
  logoUrl: String,
  branding: {
    primaryColor: { type: String, match: /^#[0-9A-F]{6}$/i, default: '#3B82F6' },
    secondaryColor: { type: String, match: /^#[0-9A-F]{6}$/i, default: '#10B981' },
    accentColor: { type: String, match: /^#[0-9A-F]{6}$/i, default: '#8B5CF6' },
    fontFamily: { type: String, default: 'Inter' },
    borderRadius: { type: String, enum: ['none','small','medium','large'], default: 'medium' }
  },
  businessInfo: {
    taxId: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    phone: String,
    website: String
  },
  planId: mongoose.Schema.Types.ObjectId,
  subscriptionId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ['active','suspended','archived','trial'], default: 'trial' },
  trialEndsAt: Date,
  storageUsedMB: { type: Number, default: 0, min: 0 },
  aiCreditsUsed: { type: Number, default: 0, min: 0 },
  monthlyTraffic: { type: Number, default: 0 },
  settings: {
    allowMemberInvites: { type: Boolean, default: true },
    defaultUserRole: { type: String, enum: ['editor','developer'], default: 'editor' },
    backupEnabled: { type: Boolean, default: true },
    backupFrequency: { type: String, enum: ['daily','weekly','monthly'], default: 'daily' }
  },
  createdBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date
});

tenantSchema.index({ slug: 1 }, { unique: true });
tenantSchema.index({ planId: 1 });
tenantSchema.index({ status: 1 });
tenantSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Tenant', tenantSchema);