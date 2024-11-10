CREATE DATABASE webistaan_cookbook;

USE webistaan_cookbook;

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    ingredients TEXT,
    instructions TEXT,
    nutrition_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE meal_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    day VARCHAR(10),
    meal_type VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);  


USE webistaan_cookbook;


INSERT INTO recipes (title, category, ingredients, instructions, nutrition_info)
VALUES
    ('Paneer Butter Masala', 'Lunch', 'Paneer, Butter, Tomato, Cream, Spices', 'Cook paneer in tomato and cream gravy with spices.', '400 kcal'),
    ('Chole Bhature', 'Lunch', 'Chickpeas, Flour, Yogurt, Spices', 'Prepare spicy chickpea curry and deep-fried bread.', '500 kcal'),
    ('Masala Dosa', 'Breakfast', 'Rice, Urad Dal, Potatoes, Spices', 'Make dosa batter, cook with potato filling.', '300 kcal'),
    ('Rajma Chawal', 'Lunch', 'Kidney Beans, Rice, Tomato, Spices', 'Cook kidney beans in a tomato-based gravy, serve with rice.', '450 kcal'),
    ('Biryani', 'Dinner', 'Rice, Meat/Vegetables, Yogurt, Spices', 'Layer rice with meat or vegetables, slow-cook with spices.', '600 kcal'),
    ('Poha', 'Breakfast', 'Flattened Rice, Onion, Potato, Spices', 'Sauté flattened rice with onions, potatoes, and spices.', '180 kcal');


INSERT INTO meal_plans (recipe_id, day, meal_type)
VALUES
    (1, 'Monday', 'Lunch'),
    (3, 'Tuesday', 'Breakfast'),
    (2, 'Wednesday', 'Lunch'),
    (4, 'Thursday', 'Lunch'),
    (5, 'Friday', 'Dinner'),
    (6, 'Saturday', 'Breakfast');

