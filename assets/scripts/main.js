// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
   const recipes_string = localStorage.getItem('recipes');
   const recipes = JSON.parse(recipes_string);
  //  console.log(recipes);
   return recipes;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  let main = document.querySelector("main");
  if(!recipes){
    return;
  }
  if(!recipes.length){
    return;
  }
  let i;
  for (i in recipes ){
    let recipe = document.createElement('recipe-card');
    recipe.data = recipes[i];
    main.appendChild(recipe);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  let recipes_string = JSON.stringify(recipes);
  localStorage.setItem('recipes', recipes_string);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  const submit = document.querySelector("[type='submit']");
  submit.addEventListener('click', () => {
    let form_data = new FormData(document.querySelector("form"));
    let recipe_object = {}
    recipe_object['imgSrc'] = form_data.get('imgSrc');
    recipe_object['imgAlt'] = form_data.get('imgAlt');
    recipe_object['titleLnk'] = form_data.get('titleLnk');
    recipe_object['titleTxt'] = form_data.get('titeTxt');
    recipe_object['organization'] = form_data.get('organization');
    recipe_object['rating'] = form_data.get('rating');
    recipe_object['numRatings'] = form_data.get('numRatings');
    recipe_object['lengthTime'] = form_data.get('lengthTime');
    recipe_object['ingredients'] = form_data.get('ingredients');
    const new_recipe = document.createElement('recipe-card');
    new_recipe.data = recipe_object;
    addRecipesToDocument([new_recipe]);
    // console.log(recipe_object);
    let re = getRecipesFromStorage();
    re.push(recipe_object);
    localStorage.setItem('recipes', JSON.stringify(re));
    // console.log('done');
    
  });

  let danger = document.querySelector('.danger');
  danger.addEventListener('click', () => {
    localStorage.clear()
    const main = document.querySelector("main")
    main.innerHTML = '';
  });
}
