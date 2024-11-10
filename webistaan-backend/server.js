// Import dependencies
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Use middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Create a connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // Your MySQL username
  password: 'cdac', // Your MySQL password
  database: 'webistaan_cookbook' // The database you want to use
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Define routes (you will add actual routes in the `routes` folder)
app.get('/', (req, res) => {
  res.send('Welcome to Webistaan Cookbook API');
});

// Define your routes file (e.g., recipesRoutes.js)
const recipesRoutes = require('./routes/recipesRoutes');
app.use('/api/recipes', recipesRoutes);

// Set the server to listen on a port
const port = 5000; // You can choose any available port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
