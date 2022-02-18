console.log("on info");
console.log(window.location.href);

function fetchRecipe() {
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf("=") + 1);
  // alert(id);

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      html = "";
      if (data.meals) {
        // createFavItem(data);
        console.log("hello ", data.meals);
        data.meals.forEach((meal) => {
          html += `<div class="details-conatiner">
              <div class="meals-desc">
              <h2 class="line"> ${meal.strMeal}</h2>
              <p> Its a ${meal.strArea} ${meal.strCategory} Dish</p>
              </div>

              <div class="mealsIng">

               <h4>Required Indgredient for this dish</h4>
               
               <span>${meal.strIngredient1},${meal.strIngredient2},${meal.strIngredient3},${meal.strIngredient4},${meal.strIngredient5}</span>
              </div>
              <div class="mealImage">
               <img src="${meal.strMealThumb}" alt="Meal Image"> 
              </div>
              


               <div class="mealPrep" height:100vh width:70% ">
              <h4>DIRECTIONS</h4>
              
                <p style="width:700px;height:500px ">${meal.strInstructions}e</p>
  
                <div>
              <div class= "mealsFooter" style="width:500px;height:300px">
              <p>
              <h4>Watch Meal Video on <a href="${meal.strYoutube}" target= "blank">YOUTUBE</a></h1>
              <h4>Give Shoutout to Creater and get similars recipes at  <a href="${meal.strSource}" target= "blank">HERE</a> </h2>
              </p>
            </div>
              
              


            </div>`;
        });
        let recipecontainer = document.getElementById("info-container");
        recipecontainer.innerHTML = html;
      }
    });
}


fetchRecipe();
