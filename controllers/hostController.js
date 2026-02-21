const Subdomain = require('../models/Subdomain');

// helper to validate subdomain name
function isValidSubdomain(name) {
  // allow letters, numbers, hyphens; cannot start or end with hyphen
  return /^[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?$/.test(name);
}

exports.createSubdomain = async (req, res, next) => {
  try {
    const { html, name } = req.body;
    if (!html || !name) {
      return res.status(400).json({ success: false, error: { message: 'html and name are required' } });
    }
    if (!isValidSubdomain(name)) {
      return res.status(400).json({ success: false, error: { message: 'invalid subdomain format' } });
    }

    // ensure subdomain is unique
    let sub = await Subdomain.findOne({ name });
    if (sub) {
      // overwrite with new html
      sub.html = html;
      await sub.save();
    } else {
      sub = new Subdomain({ name, html });
      await sub.save();
    }

    const url = `https://${name}.vrajbirje.com`;
    res.json({ success: true, data: { url } });
  } catch (err) {
    next(err);
  }
};

// middleware that intercepts requests based on hostname and serves stored HTML
exports.serveSubdomain = async (req, res, next) => {
  try {
    // host might include port, strip it
    const host = req.hostname.toLowerCase();
    if (!host.endsWith('.vrajbirje.com')) {
      return next();
    }
    const parts = host.split('.');
    if (parts.length < 3) {
      return next(); // not a subdomain
    }
    const sub = parts[0];
    const entry = await Subdomain.findOne({ name: sub });
    if (!entry) {
      return res.status(404).send('Subdomain not found');
    }
    // send raw html
    res.set('Content-Type', 'text/html; charset=utf-8');
    return res.send(entry.html);
  } catch (err) {
    next(err);
  }
};
