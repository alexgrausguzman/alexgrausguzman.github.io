
import { addMeals, getFavoritas } from './tools.js';

'use strict';

const loader = document.querySelector('.preloader');
const favoritas = document.querySelector('.lista-favoritas');


let listaFavoritas = await addMeals(getFavoritas(), true);
if(listaFavoritas.length)
    favoritas.append(...listaFavoritas)
else
    favoritas.textContent = 'No tienes favoritas...';

setTimeout(()=>{
    loader.style.display = 'none';
   /*  if(!favoritas.textContent.trim()){
        favoritas.textContent = 'No tiene recetas favoritas....';
    }
 */

}, 100);