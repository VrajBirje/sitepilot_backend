// Domain management stubs
exports.listDomains = async (req, res) => res.json({ success: true, data: {} });
exports.addDomain = async (req, res, next) => {
  try {
    const { websiteId } = req.params;
    const { domainName, setAsPrimary, autoSSL } = req.body;
    const Website = require('../models/Website');
    const site = await Website.findById(websiteId);
    if (!site) return res.status(404).json({ success: false, error: { message: 'Website not found' } });
    let finalDomain = domainName;
    // if no domain provided, assign default subdomain
    if (!finalDomain) {
      finalDomain = `${site.slug}.vrajbirje.com`;
    }
    const Domain = require('../models/Domain');
    const newDom = await Domain.create({ tenantId: site.tenantId, websiteId, domainName: finalDomain, isPrimary: !!setAsPrimary, status: 'pending', sslStatus: autoSSL ? 'pending' : 'inactive' });
    res.status(201).json({ success: true, data: newDom });
  } catch (err) {
    next(err);
  }
};
exports.verifyDomain = async (req, res) => res.json({ success: true, data: {} });
exports.setPrimary = async (req, res) => res.json({ success: true, data: {} });
