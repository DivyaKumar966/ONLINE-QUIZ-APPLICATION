const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// load env vars from .env when present
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// configuration
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizapp';

mongoose.set('strictQuery', false);

// Connect to MongoDB with logging
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err.message || err));

// Health endpoint
app.get('/health', async (req, res) => {
    const dbState = mongoose.connection.readyState; // 0 disconnected, 1 connected
    res.json({ status: 'ok', db: dbState === 1 ? 'connected' : 'disconnected' });
});

// Mount API routes
const scoresRouter = require('./routes/scores');
app.use('/api', scoresRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});