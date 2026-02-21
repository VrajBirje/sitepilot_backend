const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  websiteId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Website' },
  domainName: { type: String, required: true, lowercase: true, trim: true },
  isVerified: { type: Boolean, default: false },
  verificationMethod: { type: String, enum: ['txt','cname','http'] },
  verificationToken: String,
  verifiedAt: Date,
  dnsConfig: {
    aRecords: [String],
    cnameRecords: [{ name: String, value: String }],
    txtRecords: [String]
  },
  sslStatus: { type: String, enum: ['pending','issued','expired','failed'], default: 'pending' },
  sslIssuer: String,
  sslExpiresAt: Date,
  sslCertificate: Object,
  isPrimary: { type: Boolean, default: false },
  redirectToPrimary: { type: Boolean, default: false },
  status: { type: String, enum: ['active','pending','failed','removed'], default: 'pending' },
  registeredVia: { type: String, enum: ['internal','route53','cloudflare','godaddy'] },
  providerDetails: Object,
  expiresAt: Date,
  autoRenew: { type: Boolean, default: true },
  createdBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

domainSchema.index({ domainName: 1 }, { unique: true });
domainSchema.index({ tenantId: 1, websiteId: 1 });
domainSchema.index({ tenantId: 1, isPrimary: 1 }, { sparse: true });
domainSchema.index({ verificationToken: 1 }, { sparse: true });

module.exports = mongoose.model('Domain', domainSchema);