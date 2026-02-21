const mongoose = require('mongoose');

const pageVersionSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  pageId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Page' },
  versionNumber: { type: Number, required: true },
  versionName: String,
  description: String,
  snapshot: { pageData: Object, components: [Object], metadata: Object },
  changes: { summary: String, additions: Number, modifications: Number, deletions: Number },
  versionType: { type: String, enum: ['auto','manual','publish','restore'], default: 'auto' },
  tags: [String],
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

pageVersionSchema.index({ pageId: 1, versionNumber: 1 }, { unique: true });
pageVersionSchema.index({ tenantId: 1, createdAt: -1 });
pageVersionSchema.index({ createdBy: 1 });

module.exports = mongoose.model('PageVersion', pageVersionSchema);