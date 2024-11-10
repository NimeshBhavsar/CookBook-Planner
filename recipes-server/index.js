const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

// const { getNutritionDataFromDB, updateNutritionDataInDB } = require('./nutritionController');


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




// GET route to fetch nutrition data
app.get('/nutrition', (req, res) => {
    // Define the SQL query to get the nutrition data
    const query = 'SELECT calories, protein, carbs, fats FROM nutrition WHERE id = 1';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching nutrition data:', error);
            res.status(500).json({ error: 'Failed to fetch nutrition data' });
            return;
        }

        if (results.length > 0) {
            // Send the nutrition data as a JSON response
            res.json(results[0]);
        } else {
            // If no data found, send an appropriate response
            res.status(404).json({ message: 'No nutrition data found' });
        }
    });
});

// PUT route to update nutrition data
// PUT route to update nutrition data
app.put('/nutrition', (req, res) => {
    const { calories, protein, carbs, fats } = req.body;

    // Ensure all fields are provided
    if (calories == null || protein == null || carbs == null || fats == null) {
        return res.status(400).json({ error: 'All nutrition fields (calories, protein, carbs, fats) are required' });
    }

    // Define the SQL query to update the nutrition data
    const query = 'UPDATE nutrition SET calories = ?, protein = ?, carbs = ?, fats = ? WHERE id = 1';

    // Execute the query with provided values
    db.query(query, [calories, protein, carbs, fats], (error, results) => {
        if (error) {
            console.error('Error updating nutrition data:', error);
            res.status(500).json({ error: 'Failed to update nutrition data' });
            return;
        }

        // If update is successful, send a success message
        if (results.affectedRows > 0) {
            res.json({ message: 'Nutrition data updated successfully' });
        } else {
            res.status(404).json({ message: 'Nutrition data not found' });
        }
    });
});
