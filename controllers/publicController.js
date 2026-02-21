// Public website data and visit tracking
const Website = require('../models/Website');
const UsageMetric = require('../models/UsageMetric');

// helper to increment usage metric
async function recordVisit(tenantId, websiteId) {
  const now = new Date();
  const period = { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 };
  const filter = { tenantId, websiteId, period };
  const update = {
    $inc: { 'traffic.visits': 1, 'traffic.pageViews': 1, 'traffic.uniqueVisitors': 1 }
  };
  const opts = { upsert: true, setDefaultsOnInsert: true };
  await UsageMetric.findOneAndUpdate(filter, update, opts);
}

exports.getWebsiteData = async (req, res, next) => {
  try {
    const { websiteSlug } = req.params;
    const site = await Website.findOne({ slug: websiteSlug });
    if (!site) {
      return res.status(404).json({ success: false, error: { message: 'Website not found' } });
    }
    await recordVisit(site.tenantId, site._id);
    res.json({ success: true, data: { 
      website: {
        name: site.name,
        branding: site.brandingOverride || {},
        seo: site.seo || {}
      },
      pages: [], // front end would request separate pages API
      assets: {} 
    } });
  } catch (err) {
    next(err);
  }
};