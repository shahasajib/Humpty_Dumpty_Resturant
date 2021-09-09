// search Field
const searchFood = () => {
    const searchFeild = document.getElementById("search-field");
    const searchText = searchFeild.value;
    if (searchText == "") {
        const errorMassage = document.getElementById('error')
        const errorDiv = document.createElement("div");
        errorDiv.innerHTML = `
        <h3 class="text-center bg-info">Please write something the search box</h3>`
        errorMassage.appendChild(errorDiv)
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchMeal(data.meals));
    }
    searchFeild.value = ""

}

/* display Field */
const displaySearchMeal = meals => {
    // console.log(meals)

    const searchResult = document.getElementById("search-result");
    searchResult.textContent = ""
    if (meals == null) {
        const errorMassage = document.getElementById('error')
        const errorDiv = document.createElement("div");
        errorMassage.textContent = ""
        errorDiv.innerHTML = `
        <h3 class="text-center text-danger bg-light">Not found</h3>`
        errorMassage.appendChild(errorDiv)
    }
    else {
        meals.forEach(meal => {
            // console.log(meal)
            const div = document.createElement("div");
            div.innerHTML = `
                <div onclick="loadMealData(${meal.idMeal})" class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                    </div>
                </div>`;
            searchResult.appendChild(div)
        })
    }

}

const loadMealData = mealid => {
    // console.log(mealid)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodData(data.meals[0]))
}


/* Singal food display filed */
const displayFoodData = meal => {
    // console.log(meal)
    window.scroll(0, 40)
    const mealDetails = document.getElementById("meal-details");
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    
                </div>
            </div>`
    mealDetails.appendChild(div)

}

