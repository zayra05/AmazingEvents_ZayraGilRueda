
import {data} from './data.js';

let contenedorCards = document.getElementById('contenedorCards');
let contenedorCheckbox = document.getElementById('contenedorCheckbox');
let categorias= new Array ();
let indice= 0;
function mostrarEventos(arreglo, contenedor)
{
    for (let event of arreglo) 
    {
        let eventcard = ` <div class="col-12 col-sm-6 col-md-4 col-xl-3">
                            <div class="card" >
                                    <img src="${event.image}" class="card-img1" alt="${event.image}">
                                    <div class="card-body">
                                    <h5 class="card-title">${event.name} </h5>
                                    <p class="card-text">${event.description}</p>
                                    <a href="#" class="btn btn-primary">$${event.price}</a>
                                    <a href="./details.html" class="btn btn-secundary">Details</a>
                                    </div>
                            </div>
                        </div> ` ;
        contenedor.innerHTML += eventcard;
        if (!categorias.some(cat => cat.texto === event.category)) 
        {
            let categoria = {
                id: indice,
                texto: event.category,
                checked: true
            };
            categorias.push (categoria);
        }
        indice++;
        
    }  
}
function mostrarCategorias(arreglo, contenedor){
    arreglo.forEach(categoria  =>  {
       let checkbox= `<div class="col">
                        <div class="switch-cat">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" value=${categoria.id} checked=${categoria.checked} role="switch" id="switch${categoria.id}">
                            <label class="form-check-label" for="switch${categoria.id}">${categoria.texto}</label>
                        </div> 
                        </div> 
                        </div>`;
        contenedor.innerHTML += checkbox;    
    });     
}

mostrarEventos(data.events, contenedorCards);
mostrarCategorias(categorias, contenedorCheckbox);



let checkCat = document.querySelectorAll('.form-check-input');

document.addEventListener('input', e => { 
    if (e.target.classList.contains('form-check-input')){
        let idCheck = e.target.value;
        console.log(idCheck);
        console.log(categorias);
        let indiceCat = categorias.findIndex(categoria => categoria.id == idCheck);
        console.log(indiceCat);
        categorias[indiceCat].checked= e.target.checked;
        console.log(checkCat);
    }
});

 

