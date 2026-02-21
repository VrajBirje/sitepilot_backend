const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  websiteId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Website' },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, lowercase: true, trim: true },
  pageType: { type: String, enum: ['standard','blog','product','landing','contact'], default: 'standard' },
  parentPageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
  order: { type: Number, default: 0 },
  isHomePage: { type: Boolean, default: false },
  status: { type: String, enum: ['draft','published','archived'], default: 'draft' },
  publishedAt: Date,
  publishedVersion: Number,
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
    canonicalUrl: String,
    structuredData: Object
  },
  content: { type: Object, default: {} },
  showInNavigation: { type: Boolean, default: true },
  navigationLabel: String,
  accessLevel: { type: String, enum: ['public','authenticated','role-based'], default: 'public' },
  allowedRoles: [String],
  template: { type: String, default: 'default' },
  createdBy: mongoose.Schema.Types.ObjectId,
  lastModifiedBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

pageSchema.index({ tenantId: 1, websiteId: 1, slug: 1 }, { unique: true });
pageSchema.index({ websiteId: 1, order: 1 });
pageSchema.index({ websiteId: 1, isHomePage: 1 }, { sparse: true });
pageSchema.index({ parentPageId: 1 });

module.exports = mongoose.model('Page', pageSchema);