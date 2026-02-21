// Basic stubs for website management
const WebsiteVersion = require('../models/WebsiteVersion');
exports.listWebsites = async (req, res) => res.json({ success: true, data: {} });
exports.createWebsite = async (req, res, next) => {
  try {
    const tenantId = req.user && req.user.tenantId;
    // check plan limits
    const Subscription = require('../models/Subscription');
    const Plan = require('../models/SubscriptionPlan');
    const sub = await Subscription.findOne({ tenantId });
    if (sub) {
      const plan = await Plan.findById(sub.planId);
      const current = await Website.countDocuments({ tenantId, status: { $ne: 'archived' } });
      const max = plan ? plan.limits.maxWebsites : 1;
      if (current >= max) {
        return res.status(403).json({ success: false, error: { message: 'Website limit reached for your plan' } });
      }
    }
    const site = await Website.create({ tenantId, ...req.body });
    res.status(201).json({ success: true, data: site });
  } catch (err) {
    next(err);
  }
};
exports.getWebsite = async (req, res) => res.json({ success: true, data: {} });
exports.updateWebsite = async (req, res, next) => {
  try {
    const { websiteId } = req.params;
    const { html, ...updates } = req.body;
    const site = await Website.findByIdAndUpdate(websiteId, updates, { new: true });
    if (!site) return res.status(404).json({ success: false, error: { message: 'Website not found' } });
    // if html provided, record new version
    if (html) {
      const WebsiteVersion = require('../models/WebsiteVersion');
      const last = await WebsiteVersion.findOne({ websiteId }).sort({ versionNumber: -1 });
      const versionNumber = last ? last.versionNumber + 1 : 1;
      await WebsiteVersion.create({ websiteId, versionNumber, html });
      site.lastHtmlVersion = versionNumber;
      await site.save();
    }
    res.json({ success: true, data: { id: site._id, updatedAt: site.updatedAt } });
  } catch (err) {
    next(err);
  }
};
exports.deleteWebsite = async (req, res) => res.json({ success: true, message: 'Website archived successfully' });
exports.cloneWebsite = async (req, res) => res.json({ success: true, data: {} });