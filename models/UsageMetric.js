const mongoose = require('mongoose');

const usageMetricSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  websiteId: mongoose.Schema.Types.ObjectId,
  period: {
    year: { type: Number, required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    day: Number,
    hour: Number
  },
  traffic: {
    visits: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    pageViews: { type: Number, default: 0 },
    bounceRate: Number,
    avgSessionDuration: Number,
    sources: {
      direct: Number,
      organic: Number,
      referral: Number,
      social: Number,
      email: Number,
      paid: Number
    },
    devices: {
      desktop: Number,
      mobile: Number,
      tablet: Number
    },
    countries: Map,
    cities: Map
  },
  resources: {
    storageMB: { type: Number, default: 0 },
    bandwidthGB: { type: Number, default: 0 },
    apiCalls: { type: Number, default: 0 },
    aiRequests: { type: Number, default: 0 },
    aiTokensUsed: { type: Number, default: 0 },
    aiProcessingTime: { type: Number, default: 0 },
    totalAssets: { type: Number, default: 0 },
    assetsSizeMB: { type: Number, default: 0 }
  },
  performance: {
    avgLoadTime: Number,
    avgServerResponse: Number,
    availability: Number,
    errors: { count: Number, breakdown: Map }
  },
  limits: {
    traffic: Object,
    resources: Object,
    alerts: [{ type: String, threshold: Number, triggeredAt: Date }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

usageMetricSchema.index({ tenantId: 1, period: 1 }, { unique: true });
usageMetricSchema.index({ tenantId: 1, 'period.year': 1, 'period.month': 1 });

module.exports = mongoose.model('UsageMetric', usageMetricSchema);