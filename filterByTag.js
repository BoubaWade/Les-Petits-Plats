import { normalizeLowerCase, filterRecipes } from "./filterFor.js";
import { normalizeLowerCase, filterRecipes } from "./filterMap.js";
import {
  displayRecipes,
  getIngredients,
  getUtensils,
  getAppliances,
  updateListItemsInDOM,
  handleWindowSizeChange,
} from "./index.js";

const listIngredients = document.querySelector(".list_ingredients");
const listAppareils = document.querySelector(".list_appareils");
const listUtensils = document.querySelector(".list_utensils");
const ingredientsSelected = document.querySelector(".ingredients_selected");
const appareilsSelected = document.querySelector(".appareils_selected");
const utensilsSelected = document.querySelector(".utensils_selected");

const ingredientsInput = document.querySelector(".ingredients_container input");
const appareilsInput = document.querySelector(".appareils_container input");
const utensilsInput = document.querySelector(".utensils_container input");

export function itemHandleClick(recipes, item) {
  const circleMark = document.createElement("i");
  circleMark.setAttribute("class", "fa-regular fa-circle-xmark");
  circleMark.style.cursor = "pointer";
  item.style.width = "130px";
  item.addEventListener("click", () => {
    item.appendChild(circleMark);

    if (listIngredients.contains(item)) {
      filterByTag(recipes, ingredientsSelected, item, circleMark);
    } else if (listAppareils.contains(item)) {
      filterByTag(recipes, appareilsSelected, item, circleMark);
    } else if (listUtensils.contains(item)) {
      filterByTag(recipes, utensilsSelected, item, circleMark);
    }
  });
}

const tagsFiltered = [];
function filterByTag(recipes, itemContainer, item, circleMark) {
  itemContainer.appendChild(item);
  const tag = normalizeLowerCase(item.textContent);

  if (!tagsFiltered.includes(tag)) {
    tagsFiltered.push(tag);
  }
  let filteredRecipes = recipes;
  tagsFiltered.forEach((tag) => {
    const recipesFilteredByTag = filterRecipes(filteredRecipes, tag);
    filteredRecipes = intersection(filteredRecipes, recipesFilteredByTag);
    displayRecipes(filteredRecipes);

    updateListItemsInDOM(
      getIngredients(filteredRecipes),
      recipes,
      listIngredients,
      ingredientsInput
    );
    handleWindowSizeChange(listIngredients, ingredientsInput);
    updateListItemsInDOM(
      getAppliances(filteredRecipes),
      recipes,
      listAppareils,
      appareilsInput
    );
    handleWindowSizeChange(listAppareils, appareilsInput);
    updateListItemsInDOM(
      getUtensils(filteredRecipes),
      recipes,
      listUtensils,
      utensilsInput
    );
    handleWindowSizeChange(listUtensils, utensilsInput);
  });

  function circleMarkHandleClick(e) {
    const recipesContainer = document.querySelector(".recipes_container");
    e.stopPropagation();
    item.style.display = "none";
    const tag = normalizeLowerCase(item.textContent);
    const index = tagsFiltered.indexOf(tag);
    if (index > -1) {
      tagsFiltered.splice(index, 1);
    }
    if (tagsFiltered.length === 0) {
      recipesContainer.innerHTML = "";
      displayRecipes(recipes);

      listIngredients.innerHTML = "";
      updateListItemsInDOM(
        getIngredients(recipes),
        recipes,
        listIngredients,
        ingredientsInput
      );
      handleWindowSizeChange(listIngredients, ingredientsInput);

      listAppareils.innerHTML = "";
      updateListItemsInDOM(
        getAppliances(recipes),
        recipes,
        listAppareils,
        appareilsInput
      );
      handleWindowSizeChange(listAppareils, appareilsInput);

      listUtensils.innerHTML = "";
      updateListItemsInDOM(
        getUtensils(recipes),
        recipes,
        listUtensils,
        utensilsInput
      );
      handleWindowSizeChange(listUtensils, utensilsInput);
    } else {
      let filteredRecipesByCircle = recipes;
      tagsFiltered.forEach((tag) => {
        const recipesFilteredByTag = filterRecipes(
          filteredRecipesByCircle,
          tag
        );
        filteredRecipesByCircle = intersection(
          filteredRecipesByCircle,
          recipesFilteredByTag
        );
        recipesContainer.innerHTML = "";
        displayRecipes(filteredRecipesByCircle);
      });
    }
  }
  circleMark.addEventListener("click", circleMarkHandleClick);
}
function intersection(array1, array2) {
  return array1.filter((value) => array2.includes(value));
}
