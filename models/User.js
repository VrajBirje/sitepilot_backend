const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  token: String,
  expiresAt: Date,
  deviceInfo: String
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  passwordHash: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  globalRole: { type: String, enum: ['superadmin','platform_admin','user'], default: 'user' },
  preferences: {
    language: { type: String, default: 'en' },
    timezone: String,
    notifications: {
      email: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true }
    }
  },
  lastLoginAt: Date,
  lastLoginIP: String,
  mfaEnabled: { type: Boolean, default: false },
  mfaSecret: String,
  refreshTokens: [refreshTokenSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ 'refreshTokens.token': 1 });
userSchema.index({ createdAt: 1 });

module.exports = mongoose.model('User', userSchema);