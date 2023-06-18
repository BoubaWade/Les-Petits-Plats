import { itemHandleClick } from "./filterByTag.js";

const menuIngredients = document.querySelector(".menu_ingredients");
const menuAppareils = document.querySelector(".menu_appareils");
const menuUtensils = document.querySelector(".menu_utensils");
const listIngredients = document.querySelector(".list_ingredients");
const listAppareils = document.querySelector(".list_appareils");
const listUtensils = document.querySelector(".list_utensils");
const ingredientsInput = document.querySelector(".ingredients_container input");
const appareilsInput = document.querySelector(".appareils_container input");
const utensilsInput = document.querySelector(".utensils_container input");

const recipesContainer = document.querySelector(".recipes_container");

export async function getRecipes() {
  let recipes;
  await fetch("./Data/recipes.json")
    .then((res) => res.json())
    .then((datas) => {
      recipes = datas.recipes;
    });
  return recipes;
}
function gridListDisplay(value1, value2, value3) {
  let width;
  if (value1.length === 0) {
    value2.style.width = "0";
    value3.style.width = "150px";
  } else {
    width = `${150 * Math.min(value1.length, 3)}px`;
    value2.style.width = width;
    value3.style.width = width;
  }
  const borderRadius = value1.length >= 1 ? "5px 5px 0 0" : "5px";
  value3.style.borderRadius = borderRadius;
}
export function handleWindowSizeChange(val1, val2) {
  if (window.matchMedia("(max-width: 989px)").matches) {
    val1.style.width = "150px";
    val2.style.width = "150px";
    val2.style.borderRadius = "5px 5px 0 0";
  }
}
// ------------------------------GET---AND---DISPLAY------INGREDIENTS---------------------------------//
export function getIngredients(array) {
  let ingredient,
    ingredientCapitalized,
    ingredients = [],
    ingredientsUnique;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].ingredients.length; j++) {
      ingredient = array[i].ingredients[j].ingredient;
      if (ingredient) {
        ingredientCapitalized = ingredient.replace(/^\w/, (c) =>
          c.toUpperCase()
        );
        ingredients.push(ingredientCapitalized);
      }
    }
    ingredientsUnique = [...new Set(ingredients)].sort();
  }
  return ingredientsUnique;
}

export function displayIngredients(array) {
  for (let k = 0; k < array.length; k++) {
    if (array) {
      listIngredients.innerHTML += `
      <li class="item">${array[k]}</li>
      `;
    }
  }
}
displayIngredients(getIngredients(recipes));

export function filterIngredients(recipes, value) {
  const ingredientsInputFiltered = getIngredients(recipes).filter(
    (ingredient) =>
      ingredient.includes(value.replace(/^\w/, (c) => c.toUpperCase()))
  );
  listIngredients.innerHTML = "";
  displayIngredients(ingredientsInputFiltered);
  gridListDisplay(ingredientsInputFiltered, listIngredients, ingredientsInput);
  handleWindowSizeChange(listIngredients, ingredientsInput);

  return ingredientsInputFiltered;
}

// -------------------------------GET---AND---DISPLAY---APPAREILS--------------------------------------//
export function getAppliances(array) {
  let appliance,
    applianceCapitalized,
    appliances = [],
    appliancesUnique;
  for (let i = 0; i < array.length; i++) {
    appliance = array[i].appliance;
    if (appliance) {
      applianceCapitalized = appliance.replace(/^\w/, (c) => c.toUpperCase());
      appliances.push(applianceCapitalized);
    }
    appliancesUnique = [...new Set(appliances)].sort();
  }
  return appliancesUnique;
}

export function displayAppliances(array) {
  for (let k = 0; k < array.length; k++) {
    if (array) {
      listAppareils.innerHTML += `
      <li class="item">${array[k]}</li>
      `;
    }
  }
}
displayAppliances(getAppliances(recipes));

export function filterAppliances(recipes, value) {
  const appareilsInputFiltered = getAppliances(recipes).filter((appareil) =>
    appareil.includes(value.replace(/^\w/, (c) => c.toUpperCase()))
  );
  listAppareils.innerHTML = "";
  displayAppliances(appareilsInputFiltered);
  gridListDisplay(appareilsInputFiltered, listAppareils, appareilsInput);
  handleWindowSizeChange(listAppareils, appareilsInput);

  return appareilsInputFiltered;
}

// ----------------------------------GET---AND---DISPLAY----USTENSILS---------------------------------//
export function getUtensils(array) {
  let utensil,
    utensilCapitalized,
    utensils = [],
    utensilsUnique;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].ustensils.length; j++) {
      utensil = recipes[i].ustensils[j];
      if (utensil) {
        utensilCapitalized = utensil.replace(/^\w/, (c) => c.toUpperCase());
        utensils.push(utensilCapitalized);
      }
    }
    utensilsUnique = [...new Set(utensils)].sort();
  }
  return utensilsUnique;
}
export function displayUtensils(array) {
  for (let k = 0; k < array.length; k++) {
    if (array) {
      listUtensils.innerHTML += `
      <li class="item">${array[k]}</li>
      `;
    }
  }
}
displayUtensils(getUtensils(recipes));

export function filterUtensils(recipes, value) {
  const utensilsInputFiltered = getUtensils(recipes).filter((utensil) =>
    utensil.includes(value.replace(/^\w/, (c) => c.toUpperCase()))
  );
  listUtensils.innerHTML = "";
  displayUtensils(utensilsInputFiltered);
  gridListDisplay(utensilsInputFiltered, listUtensils, utensilsInput);
  handleWindowSizeChange(listUtensils, utensilsInput);

  return utensilsInputFiltered;
}

const arrowVectorIngredients = document.querySelector(
  ".menu_ingredients .arrow_vector"
);
const arrowVectorAppareils = document.querySelector(
  ".menu_appareils .arrow_vector"
);
const arrowVectorUtensils = document.querySelector(
  ".menu_utensils .arrow_vector"
);
const arrowInputIngredients = document.querySelector(".arrow_input_ingredient");
const arrowInputAppareils = document.querySelector(".arrow_input_appareils");
const arrowInputUtensils = document.querySelector(".arrow_input_utensils");

arrowVectorIngredients.addEventListener("click", () => {
  menuIngredients.style.display = "none";
  arrowInputIngredients.style.display = "block";
  listIngredients.classList.add("display_list");
  ingredientsInput.style.display = "block";

  if (listAppareils.classList.contains("display_list")) {
    listAppareils.classList.remove("display_list");
    appareilsInput.style.display = "none";
    menuAppareils.style.display = "flex";
    arrowInputAppareils.style.display = "none";
  }

  if (listUtensils.classList.contains("display_list")) {
    listUtensils.classList.remove("display_list");
    menuUtensils.style.display = "flex";
    utensilsInput.style.display = "none";
    arrowInputUtensils.style.display = "none";
  }
  // if (window.matchMedia("(max-width: 670px)").matches) {
  //   arrowInputIngredients.style.transform = "translateX(120px)";
  //   listIngredients.style.transform = "translateX(120px)";
  //   ingredientsInput.style.transform = "translateX(120px)";
  // }
});

arrowInputIngredients.addEventListener("click", () => {
  menuIngredients.style.display = "flex";
  listIngredients.classList.remove("display_list");
  ingredientsInput.style.display = "none";
  arrowInputIngredients.style.display = "none";
});
arrowVectorAppareils.addEventListener("click", () => {
  menuAppareils.style.display = "none";
  arrowInputAppareils.style.display = "block";
  listAppareils.classList.add("display_list");
  appareilsInput.style.display = "block";

  if (listIngredients.classList.contains("display_list")) {
    listIngredients.classList.remove("display_list");
    ingredientsInput.style.display = "none";
    menuIngredients.style.display = "flex";
    arrowInputIngredients.style.display = "none";
  }
  if (listUtensils.classList.contains("display_list")) {
    listUtensils.classList.remove("display_list");
    menuUtensils.style.display = "flex";
    utensilsInput.style.display = "none";
    arrowInputUtensils.style.display = "none";
  }
});

arrowInputAppareils.addEventListener("click", () => {
  menuAppareils.style.display = "flex";
  listAppareils.classList.remove("display_list");
  appareilsInput.style.display = "none";
  arrowInputAppareils.style.display = "none";
});

arrowVectorUtensils.addEventListener("click", () => {
  menuUtensils.style.display = "none";
  arrowInputUtensils.style.display = "block";
  listUtensils.classList.add("display_list");
  utensilsInput.style.display = "block";

  if (listIngredients.classList.contains("display_list")) {
    listIngredients.classList.remove("display_list");
    ingredientsInput.style.display = "none";
    menuIngredients.style.display = "flex";
    arrowInputIngredients.style.display = "none";
  }
  if (listAppareils.classList.contains("display_list")) {
    listAppareils.classList.remove("display_list");
    appareilsInput.style.display = "none";
    menuAppareils.style.display = "flex";
    arrowInputAppareils.style.display = "none";
  }
});

arrowInputUtensils.addEventListener("click", () => {
  menuUtensils.style.display = "flex";
  listUtensils.classList.remove("display_list");
  utensilsInput.style.display = "none";
  arrowInputUtensils.style.display = "none";
});

// -----------------------------DISPLAY---RECIPES-CARDS-------------------------//
export function displayRecipes(recipes) {
  for (let i = 0; i < recipes.length; i++) {
    const { name, ingredients, time, description } = recipes[i];
    const article = document.createElement("article");
    article.classList.add("article");
    // const picture = `Assets/pictures/${image}`;
    const imageRecipe = document.createElement("img");
    imageRecipe.classList.add("image_recipe");
    // imageRecipe.setAttribute("src", picture);
    // imageRecipe.style.objectFit = "cover";
    const titleDescriptionTimeContainer = document.createElement("div");
    titleDescriptionTimeContainer.classList.add(
      "title_description_time_container"
    );

    const titleAndDuration = document.createElement("div");
    titleAndDuration.classList.add("title_duration");
    const h2 = document.createElement("h2");
    h2.classList.add("name");
    h2.textContent = name;

    const durationContainer = document.createElement("div");
    durationContainer.classList.add("duration_container");

    const img = document.createElement("img");
    img.src = "./Assets/icons/Vectortime.svg";

    const span = document.createElement("span");
    span.textContent = `${time}min`;

    durationContainer.appendChild(img);
    durationContainer.appendChild(span);

    titleAndDuration.appendChild(h2);
    titleAndDuration.appendChild(durationContainer);

    const ingredientsDescriptionContainer = document.createElement("div");
    ingredientsDescriptionContainer.classList.add(
      "ingredients_description_container"
    );

    const ingredientsRecipe = document.createElement("ul");
    ingredientsRecipe.classList.add("list_ingredients_recipe");

    for (let j = 0; j < ingredients.length; j++) {
      const li = document.createElement("li");

      li.textContent = `${ingredients[j].ingredient} : ${
        ingredients[j].quantity
          ? ingredients[j].quantity
          : (ingredients[j].quantity = "")
      } ${
        ingredients[j].unit ? ingredients[j].unit : (ingredients[j].unit = "")
      }`;
      ingredientsRecipe.appendChild(li);
    }
    const descriptionRecipe = document.createElement("p");
    descriptionRecipe.classList.add("description");
    descriptionRecipe.textContent = description;
    const contenu = descriptionRecipe.textContent;
    const limit = 250;

    const descriptionRecipeSplit =
      contenu.length > limit ? contenu.slice(0, limit) + "..." : contenu;
    descriptionRecipe.innerHTML = descriptionRecipeSplit;

    ingredientsDescriptionContainer.appendChild(ingredientsRecipe);
    ingredientsDescriptionContainer.appendChild(descriptionRecipe);

    titleDescriptionTimeContainer.appendChild(titleAndDuration);
    titleDescriptionTimeContainer.appendChild(ingredientsDescriptionContainer);

    article.appendChild(imageRecipe);
    article.appendChild(titleDescriptionTimeContainer);

    recipesContainer.appendChild(article);
  }
  return recipesContainer;
}
displayRecipes(recipes);

const inputs = document.querySelectorAll(".input");
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (input === ingredientsInput) {
      displayByTags(e, recipes, filterIngredients, listIngredients);
    } else if (input === appareilsInput) {
      displayByTags(e, recipes, filterAppliances, listAppareils);
    } else {
      displayByTags(e, recipes, filterUtensils, listUtensils);
    }
  });
});

export function displayByTags(e, recipes, filterItems, listItems) {
  let value = e.target.value;
  value = value.replace(/^\w/, (c) => c.toUpperCase());

  const tagsInputFilteredDOM = [];
  filterItems(recipes, value).forEach((element) => {
    const newElement = document.createElement("li");
    newElement.setAttribute("class", "item");
    newElement.textContent = element;
    tagsInputFilteredDOM.push(newElement);
  });
  listItems.innerHTML = "";
  tagsInputFilteredDOM.forEach((element) => {
    listItems.appendChild(element);
  });

  tagsInputFilteredDOM.forEach((item) => {
    itemHandleClick(recipes, item);
  });
}

export function updateListItemsInDOM(array, recipes, listItems, itemsInput) {
  const tagsInputFilteredDOM = [];
  if (array) {
    array.forEach((element) => {
      const newElement = document.createElement("li");
      newElement.setAttribute("class", "item");
      newElement.textContent = element;
      tagsInputFilteredDOM.push(newElement);
    });
  }
  listItems.innerHTML = "";
  tagsInputFilteredDOM.forEach((element) => {
    listItems.appendChild(element);
  });
  gridListDisplay(tagsInputFilteredDOM, listItems, itemsInput);
  tagsInputFilteredDOM.forEach((item) => {
    itemHandleClick(recipes, item);
  });
}
const items = document.querySelectorAll(".item");
items.forEach((item) => {
  itemHandleClick(recipes, item);
});
