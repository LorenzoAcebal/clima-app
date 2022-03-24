const axios = require('axios');

class Searches {


    constructor(){
        //ToDo: leer Db si existe
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY
        }
    }

    async city( place = ''){
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

}

module.exports = Searches;