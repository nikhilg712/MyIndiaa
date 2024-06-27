const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./config/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { limiter } = require('./middleware/rateLimiter');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(logger);
app.use(limiter);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
