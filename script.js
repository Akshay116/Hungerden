console.log('tested');
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
// const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener("click", getMealList);
// mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//     mealDetailsContent.parentElement.classList.remove('showRecipe');
// });

// get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <div class ="btn-group"> 
                             <a href = "#" class = "recipe-btn">Get Recipe</a>
                             <a href = "#" class = "recipe-btn" >Fav</a>

                             </div>
                        </div>
                    </div>
                `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}

function fetchDefault() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((Response) => Response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class = "meal-img">
                    <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                    <a href = "#" class = "recipe-btn" >Fav</a>
                </div>
            </div>
        `;
        });
        mealList.innerHTML = html;
      }
    });
}
fetchDefault();

// get recipe of the meal

// create a modal
// function mealRecipeModal(meal){
//     console.log(meal);
//     meal = meal[0];
//     let html = `
//         <h2 class = "recipe-title">${meal.strMeal}</h2>
//         <p class = "recipe-category">${meal.strCategory}</p>
//         <div class = "recipe-instruct">
//             <h3>Instructions:</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//         <div class = "recipe-meal-img">
//             <img src = "${meal.strMealThumb}" alt = "">
//         </div>
//         <div class = "recipe-link">
//             <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
//         </div>
//     `;
//     mealDetailsContent.innerHTML = html;
//     mealDetailsContent.parentElement.classList.add('showRecipe');
// }
