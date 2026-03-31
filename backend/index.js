const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { kv } = process.env.KV_URL ? require('@vercel/kv') : { kv: null };
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const JWT_SECRET = process.env.JWT_SECRET || 'gprsi-maritime-secret-2024';

const IS_CLOUD = !!process.env.KV_URL;

// --- HYBRID DATA LAYER ---

// Global Content Key for Vercel KV
const MARITIME_DATA_KEY = 'gprsi_site_content';

const readDB = async () => {
    if (IS_CLOUD && kv) {
        try {
            const data = await kv.get(MARITIME_DATA_KEY);
            return data || { about: {}, services: [], projects: [], home: {}, footer: {} };
        } catch (err) {
            console.error("Cloud Retrieval Error:", err);
            // Fallback to minimal data if cloud fails
            return { about: {}, services: [], projects: [], home: {}, footer: {} };
        }
    }

    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading maritime database:", err);
        return { about: {}, services: [], projects: [], home: {}, footer: {} };
    }
};

const writeDB = async (data) => {
    if (IS_CLOUD && kv) {
        try {
            await kv.set(MARITIME_DATA_KEY, data);
            return true;
        } catch (err) {
            console.error("Cloud Sync Error:", err);
            return false;
        }
    }

    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error("Critical: Failed to sync maritime database to disk:", err);
        return false;
    }
};

app.use(cors({
    origin: [
        'https://grpsi-site.vercel.app', 
        'https://grpsi-site.vercel.app/',
        'http://localhost:3000',
        'http://localhost:5000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// CORS is handled globally by app.use(cors(...)) above.

app.use(express.json());

// Middleware to Authenticate JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Access Denied. No token provided." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token is invalid or expired." });
        req.user = user;
        next();
    });
};

// --- END HYBRID LAYER ---

// --- AUTH ROUTES ---

app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;

    // For production, this should be against a real db hash
    if (password === (process.env.ADMIN_PASSWORD || 'admin123')) {
        const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ error: "Invalid credentials" });
});

// --- API ROUTES ---

// Get All Content (Public)
app.get('/api/content', async (req, res) => {
    const data = await readDB();
    res.json(data);
});

// Specific Collection Routes (Backward Compatibility)
app.get('/api/services', async (req, res) => {
    const data = await readDB();
    res.json(data.services || []);
});

app.get('/api/projects', async (req, res) => {
    const data = await readDB();
    res.json(data.projects || []);
});

app.get('/api/about', async (req, res) => {
    const data = await readDB();
    res.json(data.about || {});
});

// Admin Update Content (Protected)
app.post('/api/admin/update', authenticateToken, async (req, res) => {
    const { collection, itemIndex, updatedItem, fullCollection } = req.body;
    const db = await readDB();

    if (fullCollection && collection) {
        // Update entire collection (About object or Array)
        db[collection] = fullCollection;
    } else if (collection && itemIndex !== undefined && updatedItem) {
        // Update specific item in array
        if (Array.isArray(db[collection])) {
            db[collection][itemIndex] = updatedItem;
        } else {
            return res.status(400).json({ error: "Collection is not an array for indexed update." });
        }
    } else {
        return res.status(400).json({ error: "Invalid payload. Provide collection and either itemIndex+updatedItem or fullCollection." });
    }

    if (await writeDB(db)) {
        res.json({ message: "Content updated successfully", db });
    } else {
        res.status(500).json({ error: "Failed to write to database." });
    }
});

app.listen(PORT, () => {
    console.log(`GPRSI Backend Port: ${PORT}`);
});
