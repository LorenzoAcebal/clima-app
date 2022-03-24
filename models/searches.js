const fs = require('fs');

const axios = require('axios');

class Searches {

    history = [];
    dbPath= './db/database.json';
    constructor(){
        //ToDo: leer Db si existe
        this.readDB();
    }
    //!Capitalizar strings
    get historyCapitalized(){
        return this.history.map(place=>{
            let words = place.split(' ');//!Divide en un arreglo a las palabras separadas por un espacio
            words = words.map(p => p[0].toUpperCase() + p.substring(1));
        
            return words.join(' ')
        })
         
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY
        }
    }

    async searchCity( place = ''){
        try {
            // http request, se recomienda el try catch para request
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            });

            const resp= await instance.get();
            //! Aca estamos retornando en el mapeo, un objeto implicitamente encerrandolo en ({})
            //! En mapbox es center= [long, lat]
            return resp.data.features.map( place =>({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))
        } catch (error) {
            return [];
        }
    }

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units':'metric'
        }
    }
    async searchWeather(lat, lon){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            });

            const resp= await instance.get();
            //! Aca estamos retornando en el mapeo, un objeto implicitamente encerrandolo en ({})
            //! En mapbox es center= [long, lat]
            const {weather, main} =resp.data;
            //! PAra evitar estas largos caminos se usa el deconstructing
            // temp: resp.data.main.temp,
            // min: resp.data.main.temp_min,
            // max: resp.data.main.temp_max,
            // desc: resp.data.weather[0].description
            return {
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
                desc: weather[0].description
            }
        } catch (error) {
            console.log(error);
        }
    }

    addToHistory(place = ""){
        //Todo: Prevenir duplicados
        if(this.history.includes(place.toLocaleLowerCase())){
            return;
        }
        this.history = this.history.splice(0,5);
        this.history.unshift(place.toLocaleLowerCase());
        //Todo: Grabar en DB
        this.saveDB();
    }

    saveDB(){
        const payload={
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
    readDB(){
        if(fs.existsSync(this.dbPath)){
            const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
            const infoJS = JSON.parse(info);
            this.history= infoJS.history;
        }
    }
}

module.exports = Searches;