import { Router } from 'express';
import Tenant from '../models/Tenant.js';
import { verifyToken, checkTenantAccess, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/tenants/all — get all tenants (public access)
// no token required, anyone can call this endpoint
router.get('/all', async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate('ownerUserId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      ok: true,
      count: tenants.length,
      tenants
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// GET /api/tenants/:tenantId  — get tenant details
// ══════════════════════════════════════════════════════════════════════════════
router.get('/:tenantId', async (req, res) => {
  try {
    const { tenantId } = req.params;

    const tenant = await Tenant.findById(tenantId)
      .populate('ownerUserId', 'name email');

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found.' });
    }

    res.json({
      ok: true,
      tenant
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ══════════════════════════════════════════════════════════════════════════════
// PUT /api/tenants/:tenantId  — update tenant details (ADMIN ONLY)
// Body: { name?, description?, logo? }
// ══════════════════════════════════════════════════════════════════════════════
router.put('/:tenantId', verifyToken, checkTenantAccess, requireAdmin, async (req, res) => {
  try {
    const { name, description, logo } = req.body;
    const tenant = await Tenant.findById(req.tenantId);

    if (!tenant) return res.status(404).json({ error: 'Tenant not found.' });

    if (name !== undefined) tenant.name = name;
    if (description !== undefined) tenant.description = description;
    if (logo !== undefined) tenant.logo = logo;
    await tenant.save();

    res.json({ ok: true, tenant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
