const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const orderRoutes = require('./routes/order');
const customerRoutes = require('./routes/customer');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');
const profileRoutes = require('./routes/profile');
const debugMiddleware = require('./middleware/debugMiddleware');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(debugMiddleware);

// Connect to MongoDB
connectDB();

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // Some book routes are public, some need auth

// Protected routes
app.use('/api/profile', profileRoutes); // New profile routes
app.use('/api/orders', orderRoutes); // Requires authentication
app.use('/api/admin', adminRoutes); // Requires admin role
app.use('/api/customers', customerRoutes); // Requires admin role
app.use('/api/analytics', analyticsRoutes); // Requires admin role
app.use('/api/upload', uploadRoutes); // Requires authentication

// Route gốc
app.get('/', (req, res) => {
	res.send('Hello World');
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: 'Something went wrong!',
	});
});

module.exports = app;
