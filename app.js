require('dotenv').config()

const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
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
                await searches.city(place);
                //Todo: Buscar Lugar
                //Todo: Seleccionar lugar
                //Todo: Mostrar Clima
                //Todo: Mostrar Resultados
                console.log('\nEligiendo Ciudad...\n'.green);
                console.log('Ciudad: ',);
                console.log('Lat: ',);
                console.log('Lng: ',);
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