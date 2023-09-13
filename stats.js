let apiurl='https://mindhub-xj03.onrender.com/api/amazing';

let pastEvents = new Array ();
let upcomingEvents = new Array ();
let categorias = new Array ();
let currentDate = "2023-01-01";
let HightAssistance = [];
let lowAssistance = [];
let HightCapacity = [];


await getEventsdata();
obtenerCategorias(pastEvents);
getHighestAssistence(pastEvents);

//console.log(lowAssistance.slice(0,3));
//console.log(HightCapacity.slice(0,3));

async function getEventsdata()
{
    try
    { 
        const respuesta = await fetch (apiurl);
        const dataJson = await respuesta.json();
        for(const event of dataJson.events)
        {
            if (event.date < currentDate){
                pastEvents.push(event);
            }
            else if ( event.date >= currentDate){
                upcomingEvents.push(event);
            }
        }
    }
    catch (error)
    {
        console.log(error);
    }
}
function obtenerCategorias(eventos)
{
    for (let evento of eventos){
        if (!categorias.some(cat => cat === evento.category)) 
        {
            categorias.push (evento.category);
        }
    }
}
function getHighestAssistence(events) {
    
    let PromedioCat = [];
    for (let cat of categorias){
        let eventosFiltrados = events.filter (evento => evento.category == cat);
        let promedioC = getPromedio (eventosFiltrados);
        let PromCat = {
            nombre : cat, 
            promedio : promedioC,
        };
        PromedioCat.push(PromCat);
    }
    HightCapacity = events.sort((a,b) => b.capacity - a.capacity).slice(0,3).map(event => {return {nombre: event.name, capacidad: event.capacity}});
    HightAssistance = PromedioCat.sort((a,b) => b.promedio - a.promedio).slice(0,3);
    lowAssistance = PromedioCat.sort((a,b)=> a.promedio - b.promedio).slice(0,3);
    
}
function getPromedio (events){
    let suma = 0;
    events.forEach(evento => {
        suma += evento.assistance ;
    });
    return Math.round(suma / events.length);
}


