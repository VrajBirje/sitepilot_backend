// Analytics endpoints
const UsageMetric = require('../models/UsageMetric');

// helper to aggregate by tenant (and optional website)
async function aggregateUsage(tenantId, websiteId) {
  const match = { tenantId };
  if (websiteId) match.websiteId = websiteId;
  const data = await UsageMetric.aggregate([
    { $match: match },
    { $group: {
        _id: null,
        totalVisits: { $sum: '$traffic.visits' },
        totalPageViews: { $sum: '$traffic.pageViews' },
        uniqueVisitors: { $sum: '$traffic.uniqueVisitors' }
      }}
  ]);
  return data[0] || { totalVisits: 0, totalPageViews: 0, uniqueVisitors: 0 };
}

exports.overview = async (req, res, next) => {
  try {
    const tenantId = req.user && req.user.tenantId; // assume token carries tenant
    if (!tenantId) return res.status(403).json({ success: false, error: { message: 'No tenant context' } });
    const summary = await aggregateUsage(tenantId);
    res.json({ success: true, data: { summary } });
  } catch (err) {
    next(err);
  }
};

exports.usage = async (req, res, next) => {
  // could return raw metrics or per-site breakdown
  try {
    const tenantId = req.user && req.user.tenantId;
    const metrics = await UsageMetric.find({ tenantId }).limit(100).sort({ 'period.year': -1, 'period.month': -1 });
    res.json({ success: true, data: { metrics } });
  } catch (err) {
    next(err);
  }
};