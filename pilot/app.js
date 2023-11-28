const express = require('express');
const postgres = require('pg');
const path = require('path');
const router = require('./routes/index');
const app = express();
const port = 5000

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(router);

const connection = new postgres.Client({
    host: 'localhost',
    port: 5432,
    database: 'my_database',
    user: 'my_user',
    password: 'my_password'
});

// Create a route to login to the database
app.post('/login', (req, res) => {
    // Try to connect to the database
    try {
      connection.connect();
      // Login to the database
      connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password], (err, rows) => {
        if (err) {
          // Handle the error
          res.send(500, err);
        } else {
          // Login successful
          res.send(200, rows);
        }
      });
    } catch (err) {
      // Handle the error
      res.send(500, err);
    }
});

app.listen(5000, () => console.log(`Example app listening on port ${port}`));