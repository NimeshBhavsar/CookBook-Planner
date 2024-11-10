function addNewMeal() {
    const day = document.getElementById('day').value;
    const breakfast = document.getElementById('breakfast').value;
    const lunch = document.getElementById('lunch').value;
    const dinner = document.getElementById('dinner').value;
    const snacks = document.getElementById('snacks').value;


    const daySection = document.querySelector(`#planner .${day.toLowerCase()}`);
    if (daySection) {
        daySection.innerHTML = `
            <p>Breakfast: ${breakfast}</p>
            <p>Lunch: ${lunch}</p>
            <p>Dinner: ${dinner}</p>
            <p>Snacks: ${snacks}</p>
        `;
    }
}

// Function to add a new meal (original function)
async function addMealToList(event) {
    event.preventDefault();

    const mealName = document.getElementById('mealName').value;
    const mealIngredient = document.getElementById('mealIncredient').value;
    const mealProcedure = document.getElementById('mealProcedure').value;

    try {
        await fetch('http://localhost:3000/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: mealName,
                ingredients: mealIngredient,
                procedur: mealProcedure
            })
        });

        document.getElementById('mealName').value = '';
        document.getElementById('mealIncredient').value = '';
        document.getElementById('mealProcedure').value = '';
        fetchAndDisplayMeals(); // Refresh the list after adding
    } catch (error) {
        console.error('Error adding meal:', error);
    }
}

async function fetchAndDisplayMeals() {
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = ''; // Clear the list before displaying

    try {
        // Fetch all recipes from the database
        const response = await fetch('http://localhost:3000/recipes');
        const meals = await response.json();

        // Iterate through each meal and add it to the DOM
        meals.forEach(meal => {
            const mealItem = document.createElement('div');
            mealItem.classList.add('meal-item', 'border', 'p-2', 'mb-2');
            mealItem.innerHTML = `
                <h5>${meal.name}</h5>
                <p>Ingredients: ${meal.ingredients}</p>
                <p>Procedure: ${meal.procedur}</p>
                <button class="delete-btn" onclick="deleteMeal(${meal.id})">Delete</button>
                <button class="edit-btn" onclick="editMeal(${meal.id}, '${meal.name}', '${meal.ingredients}', '${meal.procedur
                }')">Edit</button>
            `;
            mealList.appendChild(mealItem);
        });
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

// Function to delete a meal by ID
async function deleteMeal(id) {
    try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log(`Meal with ID ${id} deleted successfully.`);
            fetchAndDisplayMeals(); // Refresh the list after deletion
        } else {
            console.error('Error deleting meal:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting meal:', error);
    }
}

// Function to open the edit form and populate it with current meal data
function editMeal(id, name, ingredients, procedure) {
    // Populate the form fields with the current meal data
    document.getElementById('mealName').value = name;
    document.getElementById('mealIncredient').value = ingredients;
    document.getElementById('mealProcedure').value = procedure;

    // Set a hidden field or global variable for the current meal ID
    document.getElementById('mealId').value = id;

    // Change the submit button to say "Update" instead of "Add"
    document.getElementById('submitMeal').textContent = 'Update Meal';
    document.getElementById('submitMeal').onclick = function (event) {
        event.preventDefault();
        updateMeal();
    };
}

// Function to update a meal by ID
async function updateMeal() {
    const id = document.getElementById('mealId').value;
    const updatedName = document.getElementById('mealName').value;
    const updatedIngredients = document.getElementById('mealIncredient').value;
    const updatedProcedure = document.getElementById('mealProcedure').value;

    try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: updatedName,
                ingredients: updatedIngredients,
                procedur: updatedProcedure
            })
        });

        if (response.ok) {
            console.log(`Meal with ID ${id} updated successfully.`);
            fetchAndDisplayMeals(); // Refresh the list after updating

            // Reset the form and change the button back to "Add"
            document.getElementById('mealName').value = '';
            document.getElementById('mealIncredient').value = '';
            document.getElementById('mealProcedure').value = '';
            document.getElementById('submitMeal').textContent = 'Add Meal';
            document.getElementById('submitMeal').onclick = addMealToList;
        } else {
            console.error('Error updating meal:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating meal:', error);
    }
}


// Fetch and display all meals on page load
document.addEventListener('DOMContentLoaded', fetchAndDisplayMeals);
document.getElementById('meal-form').addEventListener('submit', addMealToList);
document.getElementById('saveBtn').addEventListener('click', addNewMeal);
