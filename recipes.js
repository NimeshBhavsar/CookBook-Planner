let recipes = [];

document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;
    const recipe = {
        id: Date.now(),
        name: recipeName,
        ingredients: ingredients,
        instructions: instructions
    };
    recipes.push(recipe);
    displayRecipes();
    this.reset();
});

function displayRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <h5>${recipe.name}</h5>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button class="btn btn-warning btn-sm" onclick="editRecipe(${recipe.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteRecipe(${recipe.id})">Delete</button>
        `;
        recipeList.appendChild(li);
    });
}

function editRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('ingredients').value = recipe.ingredients.join(', ');
    document.getElementById('instructions').value = recipe.instructions;
    deleteRecipe(id);
}

function deleteRecipe(id) {
    recipes = recipes.filter(r => r.id !== id);
    displayRecipes();
}
