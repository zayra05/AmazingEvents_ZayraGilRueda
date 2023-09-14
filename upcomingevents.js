let apiurl='https://mindhub-xj03.onrender.com/api/amazing';
let eventos =[];
let currentDate = "2023-01-01";
  
let contenedorCards = document.getElementById('contenedorCards');
let contenedorCheckbox = document.getElementById('contenedorCheckbox');
let categorias= new Array ();
let buscador = document.querySelector('input[name=buscador]');
let form = document.querySelector('form'); 


await getEventsdata();
mostrarEventos(eventos, contenedorCards);
obtenerCategorias(eventos);
mostrarCategorias(categorias, contenedorCheckbox);

let checkCat = document.querySelectorAll('.form-check-input');
document.addEventListener('input', e => { 
    if (e.target.classList.contains('form-check-input')){
        let idCheck = e.target.value;
        let indiceCat = categorias.findIndex(categoria => categoria.id == idCheck);
        categorias[indiceCat].checked= e.target.checked;
    }
});
checkCat.forEach(input => {
    input.addEventListener('change', () => {
        let catTrue = categorias.filter(cat => cat.checked).map(x => x.texto);
        let busca = document.getElementById("searchTxt").value;
        let filtrados;
        if (catTrue.length > 0){
            if(busca == ''){
                filtrados = eventos.filter(evento => catTrue.includes(evento.category));
            }
            else{
                let filtradosEventosCat = eventos.filter(evento => catTrue.includes(evento.category));
                filtrados = filtradosEventosCat.filter(evento => evento.description.toLowerCase().includes(busca.toLowerCase()) ||  evento.name.toLowerCase().includes(busca.toLowerCase()));
            }
            mostrarEventos(filtrados, contenedorCards);
            if(filtrados.length == 0){
                MostrarMensaje(true);
            }
            else{
                MostrarMensaje(false);
            }
        }
        else{
            if(busca != ''){
                filtrados = eventos.filter(evento => evento.description.toLowerCase().includes(busca.toLowerCase()) ||  evento.name.toLowerCase().includes(busca.toLowerCase()));
            }
            mostrarEventos(filtrados, contenedorCards);
            if(filtrados.length == 0){
                MostrarMensaje(true);
            }
            else{
                MostrarMensaje(false);
            }
        }
    });
});
buscador.addEventListener('input', () => {
    let busqueda = buscador.value;
    let catTrue = categorias.filter(cat => cat.checked).map(x => x.texto);
    if(catTrue.length > 0){
        let filtradosEventosCat = eventos.filter(evento => catTrue.includes(evento.category));
        let filtrados = filtradosEventosCat.filter(evento => evento.description.toLowerCase().includes(busqueda.toLowerCase()) ||  evento.name.toLowerCase().includes(busqueda.toLowerCase()));
        mostrarEventos(filtrados, contenedorCards);
        if(filtrados.length == 0){
            MostrarMensaje(true);
        }
        else{
            MostrarMensaje(false);
        }
        
        
    }
    else{
        let filtrados = eventos.filter(evento => evento.description.toLowerCase().includes(busqueda.toLowerCase()) ||  evento.name.toLowerCase().includes(busqueda.toLowerCase()));
        mostrarEventos(filtrados, contenedorCards);
        if(filtrados.length == 0){
            MostrarMensaje(true);
        }
        else{
            MostrarMensaje(false);
        }
    }
}) 

function MostrarMensaje(mostrar){
    var x = document.getElementById("myDIV");
    if (mostrar) {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}
async function getEventsdata()
{
    try
    { 
        const respuesta = await fetch (apiurl);
        const dataJson = await respuesta.json();
        for(const event of dataJson.events)
        {
            eventos.push(event);
        }
        console.log(eventos);
    }
    catch (error)
    {
        console.log(error);
    }
}
function mostrarEventos(arreglo, contenedor)
{
    let eventcard = ""
    for (let event of arreglo) { 
        if ( event.date >= currentDate){ 
            eventcard += `<div class="col-12 col-sm-6 col-md-4 col-xl-3">
                            <div class="card" >
                                <img src="${event.image}" class="card-img1" alt="${event.image}">
                                <div class="card-body">
                                <h5 class="card-title">${event.name} </h5>
                                <p class="card-text">${event.description}</p>
                                <a href="#" class="btn btn-primary">$${event.price}</a>
                                <a href="./details.html?id=${event._id}" class="btn btn-secundary">Details</a>
                                </div>
                            </div>
                        </div> ` ;

        }
    }
    contenedor.innerHTML = eventcard;
}
function mostrarCategorias(arreglo, contenedor){
    let checkbox= "";
    arreglo.forEach(categoria  =>  {
       checkbox += `<div class="col">
                        <div class="switch-cat">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" value=${categoria.id} role="switch" id="switch${categoria.id}">
                            <label class="form-check-label" for="switch${categoria.id}">${categoria.texto}</label>
                        </div> 
                        </div> 
                        </div>`;
            
    });   
    contenedor.innerHTML = checkbox;
}
function obtenerCategorias(arreglo)
{
    arreglo.forEach(function (event, i){
        if (!categorias.some(cat => cat.texto === event.category)) 
        {
            let categoria = {
                id: i,
                texto: event.category,
                checked: false
            };
            categorias.push (categoria);
        }
    });
}


