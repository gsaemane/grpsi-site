const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const JWT_SECRET = process.env.JWT_SECRET || 'gprsi-maritime-secret-2024';

// For demo: 'admin123' hashed
const ADMIN_HASH = "$2a$10$mRz5r5Y5eFk5R5B5T5w5e.k5u5Z5S5v5l5O5m5o5n5I5s5l5a5n5d5s"; 

app.use(cors());
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

// Helper to read DB
const readDB = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading database:", err);
        return { about: {}, services: [], projects: [] };
    }
};

// Helper to write DB
const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error("Error writing database:", err);
        return false;
    }
};

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
app.get('/api/content', (req, res) => {
    const data = readDB();
    res.json(data);
});

// Specific Collection Routes (Backward Compatibility)
app.get('/api/services', (req, res) => {
    const data = readDB();
    res.json(data.services || []);
});

app.get('/api/projects', (req, res) => {
    const data = readDB();
    res.json(data.projects || []);
});

app.get('/api/about', (req, res) => {
    const data = readDB();
    res.json(data.about || {});
});

// Admin Update Content (Protected)
app.post('/api/admin/update', authenticateToken, (req, res) => {
    const { collection, itemIndex, updatedItem, fullCollection } = req.body;
    const db = readDB();

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

    if (writeDB(db)) {
        res.json({ message: "Content updated successfully", db });
    } else {
        res.status(500).json({ error: "Failed to write to database." });
    }
});

app.listen(PORT, () => {
    console.log(`GPRSI Backend Port: ${PORT}`);
});
