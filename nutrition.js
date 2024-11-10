document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Fetch existing nutrition data from the database
        const response = await fetch(`http://localhost:3000/nutrition`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const nutritionData = await response.json();

        // Display fetched data in the HTML elements
        document.getElementById('calories-display').textContent = nutritionData.calories;
        document.getElementById('protein-display').textContent = nutritionData.protein;
        document.getElementById('carbs-display').textContent = nutritionData.carbs;
        document.getElementById('fats-display').textContent = nutritionData.fats;

        // Populate the form fields with fetched data for easy editing
        document.getElementById('calories').value = nutritionData.calories;
        document.getElementById('protein').value = nutritionData.protein;
        document.getElementById('carbs').value = nutritionData.carbs;
        document.getElementById('fats').value = nutritionData.fats;
    } catch (error) {
        console.error('Error fetching nutrition data:', error);
    }
});

document.getElementById('nutrition-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get the updated values from the form fields
    const calories = document.getElementById('calories').value;
    const protein = document.getElementById('protein').value;
    const carbs = document.getElementById('carbs').value;
    const fats = document.getElementById('fats').value;
    const id = 1;
    try {
        // Send a PUT request to update nutrition data in the database
        const response = await fetch('http://localhost:3000/nutrition', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, calories, protein, carbs, fats }),
        });

        if (!response.ok) {
            throw new Error('Failed to update nutrition data');
        }

        // Update the display with the new values
        document.getElementById('calories-display').textContent = calories;
        document.getElementById('protein-display').textContent = protein;
        document.getElementById('carbs-display').textContent = carbs;
        document.getElementById('fats-display').textContent = fats;

        // Clear the form fields if needed (optional)
        document.getElementById('nutrition-form').reset();
    } catch (error) {
        console.error('Error updating nutrition data:', error);
    }
});
