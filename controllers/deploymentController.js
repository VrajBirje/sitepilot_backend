// Deployment stubs
const WebsiteVersion = require('../models/WebsiteVersion');
const Website = require('../models/Website');

exports.deploy = async (req, res, next) => {
  try {
    // in a real implementation you'd handle build/queue etc.
    // if HTML snapshot provided, save as version
    const { websiteId } = req.params;
    const { html } = req.body;
    if (html) {
      // compute next version
      const last = await WebsiteVersion.findOne({ websiteId }).sort({ versionNumber: -1 });
      const versionNumber = last ? last.versionNumber + 1 : 1;
      const version = await WebsiteVersion.create({ websiteId, versionNumber, html });
      await Website.findByIdAndUpdate(websiteId, { lastHtmlVersion: versionNumber });
      // include version info in response
      return res.status(201).json({ success: true, data: { version, message: 'Deployment queued with html version' } });
    }
    res.status(201).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
exports.listDeployments = async (req, res) => res.json({ success: true, data: {} });
exports.rollback = async (req, res) => res.json({ success: true, data: {} });
