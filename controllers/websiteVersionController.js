const WebsiteVersion = require('../models/WebsiteVersion');
const Website = require('../models/Website');

// list all html versions for a website
exports.listHtmlVersions = async (req, res, next) => {
  try {
    const { websiteId } = req.params;
    const versions = await WebsiteVersion.find({ websiteId }).sort({ versionNumber: -1 });
    res.json({ success: true, data: { versions } });
  } catch (err) {
    next(err);
  }
};

// create a new html version (increments version number)
exports.createHtmlVersion = async (req, res, next) => {
  try {
    const { websiteId } = req.params;
    const { html, description } = req.body;
    if (!html) {
      return res.status(400).json({ success: false, error: { message: 'HTML content is required' } });
    }

    // ensure website exists
    const site = await Website.findById(websiteId);
    if (!site) {
      return res.status(404).json({ success: false, error: { message: 'Website not found' } });
    }

    // compute next version number
    const last = await WebsiteVersion.findOne({ websiteId }).sort({ versionNumber: -1 });
    const versionNumber = last ? last.versionNumber + 1 : 1;

    const version = await WebsiteVersion.create({ websiteId, versionNumber, html, description });
    // update website record with latest html version
    await Website.findByIdAndUpdate(websiteId, { lastHtmlVersion: versionNumber });
    res.status(201).json({ success: true, data: { version } });
  } catch (err) {
    next(err);
  }
};

// optionally retrieve specific version
exports.getHtmlVersion = async (req, res, next) => {
  try {
    const { websiteId, versionId } = req.params;
    const version = await WebsiteVersion.findOne({ _id: versionId, websiteId });
    if (!version) {
      return res.status(404).json({ success: false, error: { message: 'Version not found' } });
    }
    res.json({ success: true, data: { version } });
  } catch (err) {
    next(err);
  }
};