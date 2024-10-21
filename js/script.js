
function getSelectedAllergies() {
    const selectedAllergies = [];
    const allergyCheckboxes = document.querySelectorAll('.form-check-input');

    allergyCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedAllergies.push(checkbox.value);
        }
    });

    return selectedAllergies;
}

// Update the search button event listener
document.getElementById('searchButton').addEventListener('click', () => {
    const allergies = getSelectedAllergies();
    // Fetch recipes based on selected allergies
    fetchRecipes(allergies); // Modify this function to accept allergy filters
});

// Update the search button event listener
document.getElementById('searchButton').addEventListener('click', () => {
    const allergies = getSelectedAllergies();
    // Fetch recipes based on selected allergies
    fetchRecipes(allergies); // Modify this function to accept allergy filters
});

// Adjust the getSelectedAllergies function
function getSelectedAllergies() {
    return $('#allergies').val(); // This will return an array of selected values
}


const recipes = []; // This will hold fetched recipes
const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
const ownRecipes = JSON.parse(localStorage.getItem('ownRecipes')) || [];

// Function to render recipes
function renderRecipes(recipesArray) {
    const container = document.getElementById('recipeContainer');
    container.innerHTML = '';

    if (recipesArray.length === 0) {
        document.getElementById('noResultsAlert').classList.remove('d-none');
        return;
    } else {
        document.getElementById('noResultsAlert').classList.add('d-none');
    }

    recipesArray.forEach(recipe => {
        const card = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>
                        <p class="card-text">${recipe.description}</p>
                        <button class="btn btn-warning" onclick="toggleFavourite('${recipe.id}')">
                            ${favourites.includes(recipe.id) ? 'Unfavourite' : 'Favourite'}
                        </button>
                    </div>
                </div>
            </div>`;
        container.innerHTML += card;
    });
}

// Function to fetch recipes
async function fetchRecipes() {
    // Simulate fetching data
    const fetchedRecipes = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(recipes); // Replace with actual fetch logic
        }, 1000);
    });

    renderRecipes(fetchedRecipes);
}

// Toggle favourite status
function toggleFavourite(recipeId) {
    const index = favourites.indexOf(recipeId);
    if (index > -1) {
        favourites.splice(index, 1); // Remove from favourites
    } else {
        favourites.push(recipeId); // Add to favourites
    }
    localStorage.setItem('favourites', JSON.stringify(favourites));
    renderRecipes(recipes); // Re-render to update UI
}

// Add Event Listener for Search Button
document.getElementById('searchButton').addEventListener('click', () => {
    // Fetch recipes based on input criteria
    fetchRecipes(); // Modify this to filter based on input
});

// Initialize
fetchRecipes();
