const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true, enum: ['image','video','audio','document','font','other'] },
  mimeType: String,
  extension: String,
  sizeBytes: { type: Number, required: true, min: 0 },
  sizeMB: { type: Number, required: true, min: 0 },
  dimensions: { width: Number, height: Number },
  duration: Number,
  pages: Number,
  storageProvider: { type: String, enum: ['local','s3','cloudinary','azure'], default: 's3' },
  storageKey: String,
  cdnUrl: String,
  status: { type: String, enum: ['uploading','processing','ready','failed'], default: 'ready' },
  usedIn: [{ entityType: String, entityId: mongoose.Schema.Types.ObjectId, field: String }],
  optimized: {
    isOptimized: { type: Boolean, default: false },
    versions: [{ size: String, url: String, width: Number, height: Number }]
  },
  altText: String,
  caption: String,
  description: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

assetSchema.index({ tenantId: 1, createdAt: -1 });
assetSchema.index({ tenantId: 1, fileType: 1 });
assetSchema.index({ storageKey: 1 }, { unique: true });
assetSchema.index({ 'usedIn.entityId': 1 });

module.exports = mongoose.model('Asset', assetSchema);