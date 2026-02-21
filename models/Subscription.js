const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant', unique: true },
  planId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'SubscriptionPlan' },
  billingCycle: { type: String, enum: ['monthly','yearly'], required: true },
  status: { type: String, enum: [
      'active','past_due','canceled','expired','trialing','incomplete','incomplete_expired'
    ], default: 'trialing' },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  stripePriceId: String,
  paymentMethodId: String,
  currentPeriodStart: { type: Date, required: true },
  currentPeriodEnd: { type: Date, required: true },
  trialStart: Date,
  trialEnd: Date,
  cancelAtPeriodEnd: { type: Boolean, default: false },
  canceledAt: Date,
  lastInvoiceId: String,
  lastInvoiceUrl: String,
  metadata: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

subscriptionSchema.index({ tenantId: 1 }, { unique: true });
subscriptionSchema.index({ stripeSubscriptionId: 1 }, { sparse: true });
subscriptionSchema.index({ status: 1, currentPeriodEnd: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);