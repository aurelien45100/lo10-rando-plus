import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/circuits/';

class CircuitService {

    async getCircuit(circuitId) {
        return await axios.get(API_URL+'getCircuitById/' + circuitId);
    }

    async getNames(){
        return await axios.get(API_URL+'name');
    }

    async getAll(){
        return await axios.get(API_URL+'search');
    }
    
}

export default new CircuitService();