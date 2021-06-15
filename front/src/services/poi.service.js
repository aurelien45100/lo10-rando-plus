import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/poi/';

class PoiService {

    async getAll() {
        return await axios.get(API_URL+'search');
    }

    async getCoord(){
        return await axios.get(API_URL+'coord');
    }

    async create(params){
        return await axios.post(API_URL+'add', {params});
    }

    async getPersonalPoi(userId){
        return await axios.get(API_URL+'getPersonalPoi/'+userId)
    }
}

export default new PoiService();