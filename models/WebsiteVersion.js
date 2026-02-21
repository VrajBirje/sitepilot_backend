const mongoose = require('mongoose');

const websiteVersionSchema = new mongoose.Schema({
  websiteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Website'
  },
  versionNumber: {
    type: Number,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

websiteVersionSchema.index({ websiteId: 1, versionNumber: 1 }, { unique: true });

module.exports = mongoose.model('WebsiteVersion', websiteVersionSchema);