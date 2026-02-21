const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  description: String,
  priceMonthly: { type: Number, required: true, min: 0 },
  priceYearly: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD', enum: ['USD','EUR','GBP'] },
  limits: {
    maxWebsites: { type: Number, required: true, min: 1 },
    maxPagesPerSite: { type: Number, required: true, min: 1 },
    maxStorageMB: { type: Number, required: true, min: 0 },
    maxAIRequestsPerMonth: { type: Number, required: true, min: 0 },
    maxTeamMembers: { type: Number, required: true, min: 1 },
    allowCustomDomain: { type: Boolean, default: false },
    allowEcommerce: { type: Boolean, default: false },
    allowPremiumComponents: { type: Boolean, default: false },
    allowAdvancedAnalytics: { type: Boolean, default: false },
    allowBackupRestore: { type: Boolean, default: false },
    allowVersionHistory: { type: Boolean, default: true },
    bandwidthGB: { type: Number, required: true },
    supportLevel: { type: String, enum: ['basic','priority','24/7'], default: 'basic' }
  },
  availableComponents: [{
    type: String,
    enum: [
      'hero','text','gallery','form','cta','navbar','footer','pricing','testimonials','blog','shop','contact','map','video','audio','chat'
    ]
  }],
  aiCapabilities: {
    layoutGeneration: { type: Boolean, default: false },
    contentGeneration: { type: Boolean, default: false },
    imageGeneration: { type: Boolean, default: false },
    seoSuggestions: { type: Boolean, default: false },
    accessibilityAudit: { type: Boolean, default: false }
  },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

subscriptionPlanSchema.index({ code: 1 }, { unique: true });
subscriptionPlanSchema.index({ isActive: 1, sortOrder: 1 });

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);