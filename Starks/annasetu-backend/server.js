const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'annasetu.db');
const db = new Database(dbPath, { verbose: console.log });

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS ngos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    needs TEXT
  );

  CREATE TABLE IF NOT EXISTS surplus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kitchenName TEXT NOT NULL,
    foodType TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    status TEXT DEFAULT 'available',
    photoUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Add column if it doesn't exist (migration for existing DB)
try {
  db.exec("ALTER TABLE surplus ADD COLUMN photoUrl TEXT");
} catch (e) {
  // Column likely already exists, ignore
}

// Seed NGOs if empty
const checkNgos = db.prepare('SELECT COUNT(*) as count FROM ngos').get();
if (checkNgos.count === 0) {
  const insertNgo = db.prepare('INSERT INTO ngos (name, lat, lng, needs) VALUES (?, ?, ?, ?)');
  const seedData = [
    { name: 'Prerna Foundation', lat: 28.6139, lng: 77.2090, needs: 'Rice, Dal' },
    { name: 'Hope Shelter', lat: 28.6200, lng: 77.2100, needs: 'Cooked Meals' },
    { name: 'Smile NGO', lat: 28.6300, lng: 77.2200, needs: 'Vegetables' }
  ];
  seedData.forEach(ngo => insertNgo.run(ngo.name, ngo.lat, ngo.lng, ngo.needs));
}

// Routes
app.get('/api/surplus', (req, res) => {
  try {
    const surplusList = db.prepare("SELECT * FROM surplus WHERE status = 'available' ORDER BY createdAt DESC").all();
    res.json(surplusList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/surplus/:id/claim', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare("UPDATE surplus SET status = 'claimed' WHERE id = ?");
    const info = stmt.run(id);
    
    if (info.changes > 0) {
      res.json({ success: true, message: 'Surplus claimed successfully' });
    } else {
      res.status(404).json({ error: 'Surplus not found or already claimed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/surplus', (req, res) => {
  try {
    const { kitchenName, foodType, quantity, lat, lng, photoUrl } = req.body;
    const stmt = db.prepare('INSERT INTO surplus (kitchenName, foodType, quantity, lat, lng, photoUrl) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(kitchenName, foodType, quantity, lat, lng, photoUrl || null);
    res.json({ id: Number(info.lastInsertRowid), success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ngos', (req, res) => {
  try {
    const ngos = db.prepare('SELECT * FROM ngos').all();
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
