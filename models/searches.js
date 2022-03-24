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
            console.log(resp.data);
            
            return []; //return selected places
        } catch (error) {
            return [];
        }
    }

}

module.exports = Searches;