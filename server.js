const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('healthlink.db');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Route: Handle contact form submission
app.post('/submit-query', (req, res) => {
  const { name, email, phone, message } = req.body;

  db.run(
    'INSERT INTO queries (name, email, phone, message) VALUES (?, ?, ?, ?)',
    [name, email, phone, message],
    function (err) {
      if (err) {
        console.error(err);
        return res.send("There was an error saving your query.");
      }
      res.send("Query submitted successfully!");
    }
  );
});

// Route: Handle user login (demo)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.send("Login error.");
      }
      if (row) {
        res.send("Login successful!");
      } else {
        res.send("Invalid username or password.");
      }
    }
  );
});

// Route: View submitted queries (demo)
app.get('/queries', (req, res) => {
  db.all('SELECT * FROM queries', (err, rows) => {
    if (err) {
      console.error(err);
      return res.send("Error loading queries.");
    }
    let html = '<h2>Submitted Queries</h2><ul>';
    rows.forEach(row => {
      html += `<li>${row.name} (${row.email}) - ${row.message}</li>`;
    });
    html += '</ul>';
    res.send(html);
  });
});

// Route: View products list
app.get('/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error(err);
      return res.send("Error loading products.");
    }
    let html = '<h2>Available Products</h2><ul>';
    rows.forEach(row => {
      html += `<li>${row.name} (${row.category}) - $${row.price}</li>`;
    });
    html += '</ul>';
    res.send(html);
  });
});

// Start server
app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
