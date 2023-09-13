
let apiurl='https://mindhub-xj03.onrender.com/api/amazing';
let eventos =[];


  
let contenedorCards = document.getElementById('contenedorCards');
let contenedorCheckbox = document.getElementById('contenedorCheckbox');
let categorias= new Array ();
let buscador = document.querySelector('input[name=buscador]');
let form = document.querySelector('form'); 

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
function obtenerCategorias(arreglo)
{
    arreglo.forEach(function (event, i){
        if (!categorias.some(cat => cat.texto === event.category)) 
        {
            let categoria = {
                id: i,
                texto: event.category,
                checked: true
            };
            categorias.push (categoria);
        }
    });
}
function mostrarEventos(arreglo, contenedor)
{
    let eventcard = ""
    for (let event of arreglo) { 
        if ( event.date < data.currentDate ){ 
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
                            <input class="form-check-input" type="checkbox" value=${categoria.id} checked=${categoria.checked} role="switch" id="switch${categoria.id}">
                            <label class="form-check-label" for="switch${categoria.id}">${categoria.texto}</label>
                        </div> 
                        </div> 
                        </div>`;
            
    });   
    contenedor.innerHTML = checkbox;
}
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
        console.log(catTrue);
        if (catTrue.length > 0){
            let filtrados = data.events.filter(evento => catTrue.includes(evento.category));
            console.log(filtrados);
            mostrarEventos(filtrados, contenedorCards);
        }
    });
});
buscador.addEventListener('input', () => {
    let busqueda = buscador.value;
    let catTrue = categorias.filter(cat => cat.checked).map(x => x.texto);
    if(catTrue.length > 0){
        let filtradosCat = data.events.filter(evento => catTrue.includes(evento.category));
        let filtrados = filtradosCat.filter(evento => evento.description.toLowerCase().includes(busqueda.toLowerCase()) ||  evento.name.toLowerCase().includes(busqueda.toLowerCase()));
        mostrarEventos(filtrados, contenedorCards);
        if(filtrados.length == 0){
            alert("Su búsqueda no trajo resultados");
        }
        
    }
}) 







