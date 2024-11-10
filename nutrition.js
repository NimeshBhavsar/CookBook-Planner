document.getElementById('nutrition-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const calories = document.getElementById('calories').value;
    const protein = document.getElementById('protein').value;
    const carbs = document.getElementById('carbs').value;
    const fats = document.getElementById('fats').value;

    document.getElementById('calories-display').textContent = calories;
    document.getElementById('protein-display').textContent = protein;
    document.getElementById('carbs-display').textContent = carbs;
    document.getElementById('fats-display').textContent = fats;

    document.getElementById('nutrition-form').reset();
});
