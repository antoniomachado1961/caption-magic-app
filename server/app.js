const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const fetch = require('node-fetch');

const app = express();
const prisma = new PrismaClient();

require('dotenv').config();
const STABILITY_AI_API_KEY = process.env.STABILITY_AI_API_KEY;

app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth', require('./routes/auth'));
// User Routes
app.use('/api/user', require('./routes/user'));
// Stripe Routes
app.use('/api/stripe', require('./routes/stripe'));

// API endpoint to generate photorealistic images
app.post('/api/generate-post', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await fetch('https://api.stability.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${STABILITY_AI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, num_images: 1 }), // modify as needed
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error generating image');
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
