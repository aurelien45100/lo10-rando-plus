import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = "f09daabe5bd5bc40a63ad9250905554c";
const API_LANG = "fr";
const API_UNITS = "metric";

class WeatherService {

    async getMeteo(latitude, longitude) {
        let params = {lat: latitude,long: longitude,lang: API_LANG,units: API_UNITS,appId: API_KEY};
        return await axios.get(API_URL, {params})
    }
}

export default new WeatherService();
