const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('healthlink.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL
  )`);

  // Insert demo product data
  db.run(`INSERT INTO products (name, category, price) VALUES 
    ('Thermometer', 'Medical Device', 19.99),
    ('Oximeter', 'Medical Device', 25.99),
    ('Face Mask Pack', 'Protection', 9.99)
  `);
});

db.close();
