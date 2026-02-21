require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// route imports (to be filled later)
const authRoutes = require('./routes/auth');
const tenantRoutes = require('./routes/tenants');
const userRoutes = require('./routes/users');
const hostRoutes = require('./routes/host');
// ... more routes

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// host subdomain middleware - must run before other routes so we can serve html directly
const hostController = require('./controllers/hostController');
app.use(hostController.serveSubdomain);

// connect DB
connectDB();

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tenants', tenantRoutes);
app.use('/api/v1/tenants/users', userRoutes);
app.use('/api/v1', hostRoutes); // independent hosting API
app.use('/api/v1/subscriptions', require('./routes/subscriptions'));
app.use('/api/v1/websites', require('./routes/websites'));
app.use('/api/v1', require('./routes/pages')); // pages, components etc are prefixed
app.use('/api/v1', require('./routes/components'));
app.use('/api/v1', require('./routes/versions'));
app.use('/api/v1/ai', require('./routes/ai'));
app.use('/api/v1/assets', require('./routes/assets'));
app.use('/api/v1', require('./routes/domains'));
app.use('/api/v1', require('./routes/deployments'));
app.use('/api/v1/analytics', require('./routes/analytics'));
app.use('/api/v1/notifications', require('./routes/notifications'));
app.use('/api/v1/activity-logs', require('./routes/activityLogs'));
app.use('/api/v1/public', require('./routes/public'));
app.use('/api/v1', require('./routes/websiteVersions')); // html versioning for sites
// other modules can be added similarly


// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Server Error'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});