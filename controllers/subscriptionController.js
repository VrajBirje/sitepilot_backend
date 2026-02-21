// Placeholder subscription controller
const Subscription = require('../models/Subscription');
exports.getPlans = async (req, res) => res.json({ success: true, data: {} });
exports.createSubscription = async (req, res, next) => {
  try {
    // simple stub: create subscription record and simulate payment
    const { planId, billingCycle } = req.body;
    // find plan to determine price
    const Plan = require('../models/SubscriptionPlan');
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(400).json({ success: false, error: { message: 'Invalid plan' } });
    // TODO: integrate razorpay in real app; return client secret or order id
    const subscription = await Subscription.create({ tenantId: req.user.tenantId, planId, billingCycle, status: 'active', currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now()+30*24*60*60*1000) });
    res.status(201).json({ success: true, data: { subscriptionId: subscription._id, status: subscription.status, currentPeriodStart: subscription.currentPeriodStart, currentPeriodEnd: subscription.currentPeriodEnd, nextInvoice: { amount: billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly, currency: plan.currency, dueDate: subscription.currentPeriodEnd }, clientSecret: 'razorpay_dummy' } });
  } catch (err) {
    next(err);
  }
};
exports.getMySubscription = async (req, res) => res.json({ success: true, data: {} });
exports.upgrade = async (req, res) => res.json({ success: true, data: {} });
exports.cancel = async (req, res) => res.json({ success: true, message: 'Subscription will be cancelled at period end', data: {} });
exports.webhook = async (req, res) => res.json({ success: true, received: true });