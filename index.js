
import {data} from './data.js';

let contenedorCards = document.getElementById('contenedorCards');

for (let event of data.events) {
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
    

    contenedorCards.innerHTML += eventcard;
}
