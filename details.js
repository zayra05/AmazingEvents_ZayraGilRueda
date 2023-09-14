
let apiurl='https://mindhub-xj03.onrender.com/api/amazing';
let queryString = location.search;
let params = new URLSearchParams (queryString);
let URLid = params.get("id");
let eventos = [];
let contenedorDetalle = document.getElementById('contenedorDetalle');
console.log(URLid);
await getEventsData();
mostrarDetails (eventos, contenedorDetalle) ;

async function getEventsData()
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
function mostrarDetails (arreglo, contenedor) 
{
    let event = arreglo.filter(evento => evento._id == URLid.toLocaleLowerCase());
    console.log(event);
    let detailsCard = 
    `<div class="card mb-3" >
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${event[0].image}" class="card-img" alt="${event[0].image}">
                </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${event[0].name}</h5>
                            <p class="card-text">${event[0].description}</p>
                            <p class="card-place">Place: ${event[0].place}</p>
                            <p class="card-capacity">Capacity: ${event[0].capacity}</p>
                            <p class="card-assistance"> Assistance: ${event[0].assistance}</p>
                            <p class="card-price">Price: $${event[0].price}</p>
                            <p class="card-text"><small class="text-muted">${event[0].date}</p>
                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>` ;

    contenedor.innerHTML=detailsCard;
} 