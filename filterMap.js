import {
  getIngredients,
  getUtensils,
  getAppliances,
  displayRecipes,
  displayIngredients,
  displayUtensils,
  displayAppliances,
  updateListItemsInDOM,
  displayByTags,
  filterIngredients,
  filterAppliances,
  filterUtensils,
} from "./index.js";

const recipesContainer = document.querySelector(".recipes_container");
const inputSearchPrincipal = document.getElementById("search_principal");
const listIngredients = document.querySelector(".list_ingredients");
const listAppareils = document.querySelector(".list_appareils");
const listUtensils = document.querySelector(".list_utensils");

const ingredientsInput = document.querySelector(".ingredients_container input");
const appareilsInput = document.querySelector(".appareils_container input");
const utensilsInput = document.querySelector(".utensils_container input");

export function normalizeLowerCase(string) {
  const stringNormalized = string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();
  return stringNormalized;
}

export function filterRecipes(recipes, input) {
  recipesContainer.innerHTML = "";
  const recipesFilteredBySearch = recipes.filter((recipe) => {
    let haveInName = normalizeLowerCase(recipe.name).includes(input);
    let haveInAppliance = normalizeLowerCase(recipe.appliance).includes(input);
    let haveInIngredient = recipe.ingredients.some((ingredient) =>
      normalizeLowerCase(ingredient.ingredient).includes(input)
    );
    let haveInUstensils = recipe.ustensils.some((utensil) =>
      normalizeLowerCase(utensil).includes(input)
    );
    let haveInDescription = normalizeLowerCase(recipe.description).includes(
      input
    );

    if (
      haveInName ||
      haveInAppliance ||
      haveInIngredient ||
      haveInUstensils ||
      haveInDescription
    ) {
      return true;
    } else {
      return false;
    }
  });
  return recipesFilteredBySearch;
}

function handleSearchInput(input) {
  let recipesFilteredBySearch = [];
  const stringNormalized = normalizeLowerCase(input);
  recipesFilteredBySearch = filterRecipes(recipes, stringNormalized);

  if (recipesFilteredBySearch.length === 0) {
    recipesContainer.innerHTML = `<div>Aucune recette ne correspond à votre critère</div>`;
  } else {
    if (stringNormalized.length > 2) {
      recipesContainer.innerHTML = "";
      displayRecipes(recipesFilteredBySearch);
    } else {
      recipesContainer.innerHTML = "";
      displayRecipes(recipes);
    }
    listIngredients.innerHTML = "";
    displayIngredients(
      recipesFilteredBySearch
        ? getIngredients(recipesFilteredBySearch)
        : getIngredients(recipes)
    );
    listAppareils.innerHTML = "";
    displayAppliances(
      recipesFilteredBySearch
        ? getAppliances(recipesFilteredBySearch)
        : getAppliances(recipes)
    );
    listUtensils.innerHTML = "";
    displayUtensils(
      recipesFilteredBySearch
        ? getUtensils(recipesFilteredBySearch)
        : getUtensils(recipes)
    );
  }
  return recipesFilteredBySearch;
}

inputSearchPrincipal.addEventListener("input", (e) => {
  let recipesFilteredBySearch = handleSearchInput(e.target.value);
  updateListItemsInDOM(
    getIngredients(recipesFilteredBySearch),
    recipesFilteredBySearch,
    listIngredients,
    ingredientsInput
  );
  updateListItemsInDOM(
    getAppliances(recipesFilteredBySearch),
    recipesFilteredBySearch,
    listAppareils,
    appareilsInput
  );
  updateListItemsInDOM(
    getUtensils(recipesFilteredBySearch),
    recipesFilteredBySearch,
    listUtensils,
    utensilsInput
  );

  const inputs = document.querySelectorAll(".input");
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      if (input === ingredientsInput) {
        displayByTags(
          e,
          recipesFilteredBySearch,
          filterIngredients,
          listIngredients
        );
      } else if (input === appareilsInput) {
        displayByTags(
          e,
          recipesFilteredBySearch,
          filterAppliances,
          listAppareils
        );
      } else {
        displayByTags(e, recipesFilteredBySearch, filterUtensils, listUtensils);
      }
    });
  });
});
