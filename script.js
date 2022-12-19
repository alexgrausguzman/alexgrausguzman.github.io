import {addMeals, mealsCarousel, getRandomMeal,getFooByName} from './tools.js'
'use strict';
const loader = document.querySelector('.preloader');


const listFoods = document.querySelector('.list-food');
const swiper1 = document.querySelector('.swiper-wrapper');

const input = document.querySelector('input');

//Data
let carusel = await mealsCarousel(getRandomMeal());
let content = await addMeals(getRandomMeal(), false);

swiper1.append(...carusel);
listFoods.append(...content);


input.addEventListener('keydown', async (e)=>{
    if(e.key === 'Enter'){ 
        let foodSearch = await getFooByName(input.value.trim());
        listFoods.innerHTML = '';

        let showFoodSearch = await addMeals(foodSearch);
        listFoods.append(...showFoodSearch);
    }
        
})


setTimeout(()=>{
    loader.style.display = 'none';
}, 100);




