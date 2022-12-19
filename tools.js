'use strict';

let mealsFavorite = [];


mealsFavorite = JSON.parse(localStorage.getItem('mealIDs')) ?? [];

export async function getRandomMeal(){

    let listMealsRandom = [];
    let add = 6;
   
    for(let i = 0; i < add; i++ ){
        const resp = await fetch(
            'https://www.themealdb.com/api/json/v1/1/random.php'
            );
        const respData = await resp.json();
        const randomMeal = respData.meals[0];
      
        
        if(!listMealsRandom.find( item => item.idMeal === randomMeal.idMeal)){
            listMealsRandom.push(randomMeal);
        }else{
            add++;
        } 
    }
    return listMealsRandom ? listMealsRandom : [];
}

async function getFoodById(id){
   const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
   const respData = await resp.json();
   const meal = respData.meals[0];

   return meal;

}



export async function getFooByName(name){
   const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+name)
   const respData = await resp.json();
   const meal = respData.meals;

   return meal;
}


export async function mealsCarousel(list){
    let listFoods =  [];
    let list2 = await list;
    list2.forEach(meal => {
        const swiper = document.createElement('div');
        const content = document.createElement('div');
        const image = document.createElement('img')

        showEventInfo(image, meal);


        const nameFood = document.createElement('span');

        swiper.classList.add('swiper-slide');
        content.classList.add('content')
        image.src = meal.strMealThumb;
        nameFood.textContent = meal.strMeal;
        content.append(image, nameFood)
        swiper.append(content)

        listFoods.push(swiper);
    })
    
    return listFoods;

}

export async function addMeals(list, inFavorites){
    let listElements = []
    let list2 = await list ?? [];
    
    list2.forEach(meal => {
        const food = document.createElement('div');
    
        const foodHeader = document.createElement('div');
        const foodbody = document.createElement('div');

        


        showEventInfo(foodHeader, meal);
      
      

        const image = document.createElement('img')

        const nameFood = document.createElement('h4');
        const buttonHeart = document.createElement('button')
        const contentInfo = document.createElement('div');

        const icon = document.createElement('i');

        food.classList.add('food')
        foodHeader.classList.add('food-header')
        image.src = meal.strMealThumb;
        foodHeader.append(image);

        food.append(foodHeader);

        foodbody.classList.add('food-body')
        nameFood.textContent = meal.strMeal;
        buttonHeart.classList.add('favorite');

        if(inFavorites){
            buttonHeart.classList.add('active');
            buttonHeart.addEventListener('click', ()=>{
                let padre = buttonHeart.parentElement.parentElement.parentElement;
                padre.style.display = 'none';
              })
        }
        
        buttonHeart.addEventListener('click', ()=>{

            if(!buttonHeart.classList.contains('active')){
                agregarFavorita(meal.idMeal);
                buttonHeart.classList.add('active')
            }else{
                eliminarFavorita(meal.idMeal);
                buttonHeart.classList.remove('active')  
            } 
        })
        icon.classList.add('fa-solid');
        icon.classList.add('fa-heart');
        buttonHeart.append(icon);
        contentInfo.classList.add('controls');
        contentInfo.append(nameFood, buttonHeart); 

        foodbody.append(contentInfo);


        food.append(foodbody)
        listElements.push(food);
    });

    return listElements;

}

function agregarFavorita(idMeal){

   
 
    if(!mealsFavorite.find(e => e === idMeal)){
        mealsFavorite.push(idMeal)
    }
    localStorage.setItem('mealIDs', JSON.stringify(mealsFavorite))
}

function eliminarFavorita(idMeal){
    mealsFavorite = mealsFavorite.filter( id => id != idMeal);
    localStorage.setItem('mealIDs', JSON.stringify(mealsFavorite))
}


export async function getFavoritas(){
    let favoritos = [];
    
    for (let i = 0; i < mealsFavorite.length; i++) {
            let food = await getFoodById(mealsFavorite[i]);
            favoritos.push(food);
    }
    return favoritos;
    //return JSON.parse(localStorage.getItem('mealIDs'));
}


async function showModal(meal){

    let ingredientes = [];

   for(let i = 1; i < 30; i++){
        if(meal['strIngredient'+i]){
            ingredientes.push(`${meal['strIngredient'+i]} / ${meal['strMeasure'+i]}`);
        }else{
            break;
        } 
            
   }


    let contentModal = `
                        <div class="modal-dialog">
                        <button class="cerrar" ><i class="fa-solid fa-xmark"></i></button>
                           
                            <h1>${meal.strMeal}</h1>
                            <img src=${meal.strMealThumb}>

                            <h3>Ingredientes</h3>
                            <ul class='ingredientes'>
                                ${ingredientes.map(e => '<li>'+ e +'</li>').join('')}            
                            </ul>
                            <h3>Preparación</h3>
                            <p>${meal.strInstructions} </p>
                        </div>
                        
                        `;
    return contentModal;
}


async function showEventInfo(foodHeader, meal){
    const modal = document.querySelector('.modal-info');
    foodHeader.addEventListener('click', async () => {
        modal.style.visibility = 'visible';
        let content = await showModal(meal);
        modal.innerHTML = content;

        const buttonCerrar = document.querySelector('.cerrar')

        buttonCerrar.addEventListener('click', ()=>{
            modal.style.visibility = 'hidden';
        })
    
});
}
