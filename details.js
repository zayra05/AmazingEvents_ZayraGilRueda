import {data} from './data.js';

let queryString = location.search;
let params = new URLSearchParams (queryString);
let URLid = params.get("id");
let contenedorDetalle = document.getElementById('contenedorDetalle');
console.log(URLid);

mostrarDetails (data.events, contenedorDetalle) ;


function mostrarDetails (arreglo, contenedor) 
{
    let event = arreglo.filter(evento => evento._id.toLowerCase() == URLid.toLocaleLowerCase());
    console.log(event);
    let detailsCard = 
    `<div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${event[0].image}" class="card-img" alt="${event[0].image}">
                </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${event[0].name}</h5>
                            <p class="card-text">${event[0].description}</p>
                            <p class="card-text"><small class="text-muted">${event[0].date}</small></p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>` ;

    contenedor.innerHTML=detailsCard;
} 