const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  slug: { type: String, required: true, lowercase: true, trim: true },
  description: String,
  status: { type: String, enum: ['draft','published','archived'], default: 'draft' },
  visibility: { type: String, enum: ['public','private','password'], default: 'public' },
  password: String,
  brandingOverride: {
    primaryColor: String,
    secondaryColor: String,
    fontFamily: String,
    logoUrl: String,
    faviconUrl: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
    canonicalUrl: String,
    robots: { type: String, enum: ['index,follow','noindex,nofollow'], default: 'index,follow' }
  },
  analyticsId: String,
  googleTagManagerId: String,
  publishedAt: Date,
  publishedVersion: Number,
  lastDeployedAt: Date,
  settings: {
    maintenanceMode: { type: Boolean, default: false },
    sslForced: { type: Boolean, default: true },
    cacheEnabled: { type: Boolean, default: true },
    cacheTTL: { type: Number, default: 3600 }
  },
  pageCount: { type: Number, default: 0 },
  totalTraffic: { type: Number, default: 0 },
  lastHtmlVersion: { type: Number, default: 0 },
  createdBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

websiteSchema.index({ tenantId: 1, slug: 1 }, { unique: true });
websiteSchema.index({ tenantId: 1, status: 1 });
websiteSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('Website', websiteSchema);