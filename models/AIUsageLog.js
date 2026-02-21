const mongoose = require('mongoose');

const aiUsageLogSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  websiteId: mongoose.Schema.Types.ObjectId,
  pageId: mongoose.Schema.Types.ObjectId,
  requestId: { type: String, required: true, unique: true },
  action: { type: String, enum: [
      'generate-layout','generate-content','improve-content','suggest-navigation','generate-image','optimize-seo','accessibility-check','translate','summarize'
    ], required: true },
  prompt: String,
  promptTokens: Number,
  completion: String,
  completionTokens: Number,
  totalTokens: { type: Number, required: true },
  model: { type: String, required: true },
  provider: { type: String, enum: ['openai','anthropic','cohere','internal'], required: true },
  cost: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  processingTime: Number,
  status: { type: String, enum: ['success','failed','partial'], default: 'success' },
  errorMessage: String,
  context: { businessType: String, industry: String, pageType: String, componentTypes: [String] },
  createdAt: { type: Date, default: Date.now, expires: 7776000 }
});

aiUsageLogSchema.index({ requestId: 1 }, { unique: true });
aiUsageLogSchema.index({ tenantId: 1, createdAt: -1 });
aiUsageLogSchema.index({ userId: 1 });
aiUsageLogSchema.index({ tenantId: 1, action: 1, createdAt: -1 });

module.exports = mongoose.model('AIUsageLog', aiUsageLogSchema);