const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Kết nối MongoDB và lưu client
connectDB().then((client) => {
  app.locals.db = client;
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Route gốc
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});