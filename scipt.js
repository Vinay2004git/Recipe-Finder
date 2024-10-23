// Replace with your Edamam Recipe API credentials
const appId = '3d21e4b7'; 
const appKey = '3f352eb39d39a25f1de9661b5431076a'; 

const recipeForm = document.getElementById('recipe-form');
const recipeInput = document.getElementById('recipe-input');
const recipesContainer = document.getElementById('recipes-container');

// Listen for form submit
recipeForm.addEventListener('submit', fetchRecipes);

function fetchRecipes(e) {
    e.preventDefault();

    const query = recipeInput.value.trim();
    if (query === '') return;

    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&to=12`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => console.error('Error fetching recipes:', error));
}

// Display the fetched recipes
function displayRecipes(recipes) {
    recipesContainer.innerHTML = ''; // Clear previous results

    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;

        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>${recipe.label}</h3>
            <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
            <p><strong>Source:</strong> ${recipe.source}</p>
            <a href="${recipe.url}">View Recipe</a>
        `;

        recipesContainer.appendChild(recipeElement);
    });
}
