import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://hubeau.eaufrance.fr/api/v1/temperature/chronique';

class HubEauService {

    async getTemp(latitude, longitude, distance) {
        let params = {latitude: latitude,longitude: longitude, distance: distance};
        return await axios.get(API_URL, {params})
    }
}

export default new HubEauService();
