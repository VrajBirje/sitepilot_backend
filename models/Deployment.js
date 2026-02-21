const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  websiteId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Website' },
  deployedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  version: { type: Number, required: true },
  deploymentId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['queued','building','deploying','success','failed','rolled-back'], default: 'queued' },
  environment: { type: String, enum: ['development','staging','production'], default: 'production' },
  branch: String,
  commitHash: String,
  commitMessage: String,
  buildLogs: [{ timestamp: Date, level: String, message: String }],
  buildTime: Number,
  buildSize: Number,
  targets: [{ provider: String, url: String, status: String }],
  previewUrl: String,
  liveUrl: String,
  assetManifest: Object,
  rollbackFrom: mongoose.Schema.Types.ObjectId,
  rollbackTo: mongoose.Schema.Types.ObjectId,
  rollbackReason: String,
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  updatedAt: Date
});

deploymentSchema.index({ tenantId: 1, websiteId: 1, version: -1 });
deploymentSchema.index({ deploymentId: 1 }, { unique: true });
deploymentSchema.index({ status: 1, createdAt: 1 });
deploymentSchema.index({ deployedBy: 1 });

module.exports = mongoose.model('Deployment', deploymentSchema);