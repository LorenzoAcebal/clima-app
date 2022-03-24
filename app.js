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
                const places = await searches.city(place);
                //Todo: Seleccionar lugar
                //? Este es el id del lugar seleccionado
                const idSelected = await listPlaces(places)
                const placeSelected = places.find( p => p.id === idSelected);
                console.log(placeSelected);
                //Todo: Mostrar Clima
                //Todo: Mostrar Resultados
                console.log('\nInformation of the city\n'.green);
                console.log('Ciudad: ', placeSelected.name);
                console.log('Lat: ', placeSelected.lat);
                console.log('Lng: ', placeSelected.lng);
                console.log('Temperatura: ',);
                console.log('Minima: ',);
                console.log('Maxima: ',);
                break;
                case 2://Cargar 
            console.log('Cargando Historial...')
            break;
        }
        if(opt !== 0) await pause();
        
    }while(opt !== 0)
    console.clear();
    
}


main();