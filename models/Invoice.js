const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  unitPrice: Number,
  amount: Number,
  period: { start: Date, end: Date },
  metadata: Object
});

const invoiceSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subscription' },
  invoiceNumber: { type: String, required: true, unique: true },
  invoicePdf: String,
  provider: { type: String, enum: ['stripe','manual'], default: 'stripe' },
  providerInvoiceId: String,
  providerInvoiceUrl: String,
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date, required: true },
  dueDate: Date,
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, required: true, default: 'USD' },
  tax: { rate: Number, amount: Number },
  subtotal: Number,
  total: Number,
  lineItems: [lineItemSchema],
  status: { type: String, enum: ['draft','open','paid','uncollectible','void','past_due','processing'], default: 'draft' },
  paidAt: Date,
  paymentMethod: { type: String, enum: ['card','bank_transfer','crypto'] },
  paymentDetails: Object,
  transactionId: String,
  billingDetails: {
    name: String,
    email: String,
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },
    taxId: String
  },
  metadata: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

invoiceSchema.index({ invoiceNumber: 1 }, { unique: true });
invoiceSchema.index({ tenantId: 1, createdAt: -1 });
invoiceSchema.index({ subscriptionId: 1, periodStart: 1 });
invoiceSchema.index({ status: 1, dueDate: 1 });
invoiceSchema.index({ providerInvoiceId: 1 }, { sparse: true });

module.exports = mongoose.model('Invoice', invoiceSchema);