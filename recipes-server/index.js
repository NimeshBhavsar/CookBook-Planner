const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
// Initialize express and load environment variables
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

// Routes
// Create a recipe
app.post('/recipes', (req, res) => {
    const { name, ingredients, procedur } = req.body;
    const sql = 'INSERT INTO recipes (name, ingredients, procedur) VALUES (?, ?, ?)';
    db.query(sql, [name, ingredients, procedur], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, name, ingredients, procedur });
    });
});

// Read all recipes
app.get('/recipes', (req, res) => {
    const sql = 'SELECT id, name, ingredients, procedur FROM recipes';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

// Read a specific recipe by ID
app.get('/recipes/:id', (req, res) => {
    const sql = 'SELECT id, name, ingredients, procedur FROM recipes WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(result[0]);
    });
});

// Update a recipe by ID
app.put('/recipes/:id', (req, res) => {
    const { name, ingredients, procedur } = req.body;
    const sql = 'UPDATE recipes SET name = ?, ingredients = ?, procedur = ? WHERE id = ?';
    db.query(sql, [name, ingredients, procedur, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json({ id: req.params.id, name, ingredients, procedur });
    });
});

// Delete a recipe by ID
app.delete('/recipes/:id', (req, res) => {
    const sql = 'DELETE FROM recipes WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json({ message: 'Recipe deleted' });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
