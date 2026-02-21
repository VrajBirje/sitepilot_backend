const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  pageId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Page' },
  type: { type: String, required: true, enum: [
      'hero','text','gallery','form','cta','navbar','footer','pricing','testimonials','blog-posts','contact-form','map','video','audio','chat','countdown','faq','team','clients','features','statistics','timeline','accordion','tabs'
    ] },
  variant: { type: String, default: 'default' },
  isPremium: { type: Boolean, default: false },
  content: {
    heading: String,
    subheading: String,
    body: String,
    images: [{ url: String, alt: String, caption: String }],
    videoUrl: String,
    icon: String,
    buttons: [{ text: String, link: String, variant: String, openInNewTab: Boolean }],
    layout: { columns: Number, gap: String, alignment: String },
    formFields: [{ type: String, label: String, placeholder: String, required: Boolean, options: [String] }],
    pricingPlans: [{ name: String, price: Number, currency: String, interval: String, features: [String], buttonText: String, buttonLink: String, highlighted: Boolean }],
    additionalProps: Object
  },
  styling: {
    backgroundColor: String,
    textColor: String,
    padding: {
      top: Number, right: Number, bottom: Number, left: Number, unit: { type: String, default: 'px' }
    },
    margin: {
      top: Number, right: Number, bottom: Number, left: Number, unit: { type: String, default: 'px' }
    },
    customCSS: String
  },
  order: { type: Number, default: 0 },
  responsive: {
    mobile: { visible: Boolean, order: Number },
    tablet: { visible: Boolean, order: Number },
    desktop: { visible: Boolean, order: Number }
  },
  animation: { type: String, duration: Number, delay: Number },
  createdBy: mongoose.Schema.Types.ObjectId,
  lastModifiedBy: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

componentSchema.index({ pageId: 1, order: 1 });
componentSchema.index({ tenantId: 1 });
componentSchema.index({ type: 1, isPremium: 1 });

module.exports = mongoose.model('Component', componentSchema);