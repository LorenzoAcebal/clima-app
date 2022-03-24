require('dotenv').config()

const { inquirerMenu, pause, readInput, listPlaces } = require("./helpers/inquirer");
const Searches = require('./models/searches');

console.clear();


const main = async() =>{

    const searches = new Searches();
    let opt = 0;

    do{
        opt = await inquirerMenu();

        switch (opt){

            case 1://Elegir Ciudad
                //Todo: Mostrar mensaje
                const place = await readInput('Ciudad: ');
                //Todo: Buscar Lugar
                //?Esto nos retorna los resultados de la busqueda del lugar
                const places = await searches.searchCity(place);
                //Todo: Seleccionar lugar
                //! Este es el id del lugar seleccionado
                const idSelected = await listPlaces(places)
                //?Para evitar que cuando se vuelva para atras no tire error
                if(idSelected === '0') continue
                const placeSelected = places.find( p => p.id === idSelected);
                //! Guardar en DB
                searches.addToHistory(placeSelected.name)
                //Todo: Mostrar Clima
                const placeSelectedWeather = await searches.searchWeather(placeSelected.lat,placeSelected.lng);
                //Todo: Mostrar Resultados
                console.log(`\nCity's Weather\n`.green);
                console.log('Ciudad: ', placeSelected.name);
                console.log('Lat: ', placeSelected.lat);
                console.log('Lng: ', placeSelected.lng);
                console.log('Temperatura: ',placeSelectedWeather.temp, '°C'.yellow);
                console.log('Minima: ',placeSelectedWeather.min, '°C'.yellow);
                console.log('Maxima: ',placeSelectedWeather.max, '°C'.yellow);
                console.log('Detalles: ',placeSelectedWeather.desc);
                break;
                case 2://Cargar 
            console.log('Cargando Historial...')
                searches.historyCapitalized.forEach( (place, i) =>{
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${ place } `);
                })
            break;
        }
        if(opt !== 0) await pause();
        
    }while(opt !== 0)
    console.clear();
    
}


main();