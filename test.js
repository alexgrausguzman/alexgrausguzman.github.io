'use strict';

const button = document.querySelector('#abrir');
const modal = document.querySelector('.modal-info');
const buttonCerrar = document.querySelector('.cerrar')



button.addEventListener('click', ()=>{
    modal.style.visibility = 'visible';
})


buttonCerrar.addEventListener('click', ()=>{
    modal.style.visibility = 'hidden';
})
 