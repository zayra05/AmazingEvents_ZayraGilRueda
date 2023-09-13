let apiurl='https://mindhub-xj03.onrender.com/api/amazing';

let totalEvents = new Array ();
let pastEvents = new Array ();
let upcomingEvents = new Array ();
let categorias = new Array ();
let currentDate = "2023-01-01";
let highAssistance = [];
let lowAssistance = [];
let highCapacity = [];
let upcomingRevenues = [];
let upcomingPercentageOfAssistance = [];
let pastRevenues = [];
let pastPercentageOfAssistance = [];


let contenedor = document.querySelector('#Statistics tbody');


await getEventsData();
getCategorias(totalEvents);
getStatsData();
console.log(totalEvents);
ShowTabla1(contenedor);
ShowTabla2(contenedor);
ShowTabla3(contenedor);

//console.log(lowAssistance.slice(0,3));
//console.log(HightCapacity.slice(0,3));

function ShowTabla1(){
    let ciclo = 0;
    let trTable = "";
    let contenedor = document.querySelector('#Statistics tbody');
    while(ciclo < 3){
        trTable += `<tr>
                        <td class="p-3">${highAssistance[ciclo].nombre} - ${highAssistance[ciclo].promedio}</td>
                        <td class="p-3">${lowAssistance[ciclo].nombre} - ${lowAssistance[ciclo].promedio}</td>
                        <td class="p-3">${highCapacity[ciclo].nombre} - ${highCapacity[ciclo].capacidad }</td>
                   </tr>`;
        ciclo++;
    }
    contenedor.innerHTML = trTable;
}
function ShowTabla2(){
    let trTable = "";
    let contenedor = document.querySelector('#UpcomingStatistics tbody');
    categorias.forEach(function(categoria, i){
        trTable += `<tr>
                        <td class="p-3">${categoria}</td>
                        <td class="p-3">${upcomingRevenues[i]}</td>
                        <td class="p-3">${upcomingPercentageOfAssistance[i]}</td>
                   </tr>`;
    });
    contenedor.innerHTML = trTable;
}
function ShowTabla3(){
    let trTable = "";
    let contenedor = document.querySelector('#PastStatistics tbody');
    categorias.forEach(function(categoria, i){
        trTable += `<tr>
                        <td class="p-3">${categoria}</td>
                        <td class="p-3">${pastRevenues[i]}</td>
                        <td class="p-3">${pastPercentageOfAssistance[i]}</td>
                   </tr>`;
    });
    contenedor.innerHTML = trTable;
}
async function getEventsData()
{
    try
    { 
        const respuesta = await fetch (apiurl);
        const dataJson = await respuesta.json();
        for(const event of dataJson.events)
        {
            totalEvents.push(event);
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
function getCategorias(eventos)
{
    for (let evento of eventos){
        if (!categorias.some(cat => cat === evento.category)) 
        {
            categorias.push (evento.category);
        }
    }
}
function getStatsData() {
    
    let PromedioCat = [];
    for (let cat of categorias){
        let eventosFiltradosPasados = pastEvents.filter (evento => evento.category == cat);
        let promedioC = getPromedio (eventosFiltradosPasados);
        let PromCat = {
            nombre : cat, 
            promedio : promedioC,
        };
        PromedioCat.push(PromCat);
        let ganancias = getGananciasPasadas(eventosFiltradosPasados);
        pastRevenues.push(ganancias);
        pastPercentageOfAssistance.push(promedioC);


        let eventoFiltradosFuturos = upcomingEvents.filter(evento => evento.category == cat);
        ganancias = getGanancias(eventoFiltradosFuturos)
        upcomingRevenues.push(ganancias);
        let Upcoming = getPercentageOfAssistance(eventoFiltradosFuturos)
        upcomingPercentageOfAssistance.push(Upcoming);

    }
    highCapacity = pastEvents.sort((a,b) => b.capacity - a.capacity).slice(0,3).map(event => {return {nombre: event.name, capacidad: event.capacity}});
    highAssistance = PromedioCat.sort((a,b) => b.promedio - a.promedio).slice(0,3);
    lowAssistance = PromedioCat.sort((a,b)=> a.promedio - b.promedio).slice(0,3);
    
}
function getPercentageOfAssistance(eventos){
    let suma = 0;
    eventos.forEach(evento => {
        suma += evento.capacity ;
    });
    return Math.round(suma / eventos.length);
}
function getGananciasPasadas(events){
    let suma = 0;
    events.forEach(evento => {
        suma += evento.price  * evento.assistance;
    });
    return Math.round(suma);
}
function getGanancias(events){
    let suma = 0;
    events.forEach(evento => {
        suma += evento.price  * evento.capacity;
    });
    return Math.round(suma);
}
function getPromedio (events){
    let suma = 0;
    events.forEach(evento => {
        suma += evento.assistance ;
    });
    return Math.round(suma / events.length);
}


