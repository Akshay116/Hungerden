console.log("on fav");
var hasNumber = /\d/; 






//fetching the favourite item ids from local storage and converting it into an array
let item = window.localStorage.getItem("meal-favourites").split(/(\s+)/);
function ifEmptyRedirect() {
  let itemString = item.toString();

  let resCheck = hasNumber.test(itemString);
  if(!resCheck){
     window.alert("add something");
     window.location.href = "index.html";
    
  }
  console.log(resCheck);
}
 
ifEmptyRedirect();




// if (item.length == 1) {
//   window.alert("YOUR LIST IS EMPTY PlZ ADD NEW");
//   window.location.href = "index.html";
// }

item.filter(function (e) {
  return e.trim().length > 0;
});
// console.log(item);
//fetching all the favourite meals from ids stored in local storage
for (let id of item) {
  getMeal(id);
}
// console.log(typeof item);

//this function fetches a meal with a specific id
function getMeal(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        createFavItem(data);
      }
    });
}

function createFavItem(res) {
  for (res of res.meals) {
    // HTML code for the individual search result/food item

    var foodItem = `
    <div class = "meal-item" data-id = "${res.idMeal}">
    <div class = "meal-img">
        <img src = "${res.strMealThumb}" alt = "food">
    </div>
    <div class = "meal-name">
        <h3>${res.strMeal}</h3>
        <div class="btns">
       
        <button type="submit" class="btnrem "><a href = "info.html?id=${res.idMeal}" value="${res.idMeal}" class = "recipe-btn">Get Recipe</a></button>
        
      
          <button type="submit" class="btnrem recipe-btn favorite-button" id="${res.idMeal}">Remove</button>
         
      </div>
</div>
    </div>
</div>`;
    // appending the result to the root 'recipie-list' div
    let mealList = document.getElementById("meal");
    mealList.innerHTML = foodItem + mealList.innerHTML;
  }
}

// clear all // this method will only works one DOM LARNT
// const clearAll = document.getElementById("remove-all");
// let changetxt = clearAll.innerText;
// console.log(changetxt);

// clearAll.addEventListener("click",clearAllFun);

function clearAllFun() {
  if (item.length !== 1) {
    window.alert("Clearing all favs");
    window.localStorage.clear();
    window.location.href = "index.html";

    return;
  }
  // console.log("aee");
  // console.log(item.length);  = 1 '' Reason when empty
  else {
    window.alert("ADD meals from Meals REDIRECTINNG");
    window.location.href = "index.html";
  }
}

//handling click event on the 'favourite-button' to unmark an item as favourite

document.body.addEventListener("click", function (event) {
  //if the targeted div is 'favourite-button'
  console.log("click");

  if (event.target.getAttribute("class").includes("favorite-button")) {
    //finding the id of the current food item

    let id = event.target.getAttribute("id");
    //finding it's index in the item array
    let index = item.indexOf(id);

    //removing item from the array
    item.splice(index, 1);

    //creating the updated list of favourite items in a space sperated string
    let items = "";
    for (let i of item) {
      items = items + " " + i;
    }
    

    //storing the updated string in local storage
    window.localStorage.setItem("meal-favourites", items);
    console.log('returing');
    console.log(item);
    
    

    //refreshing the page
    location.reload();
  }
});
 




   