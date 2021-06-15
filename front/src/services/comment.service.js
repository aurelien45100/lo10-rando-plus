import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comment/';

class CommentService {
    async getComments(circuitId) {
        return await axios.get('http://localhost:8080/api/comment/get/' + circuitId)
    }
  
}

export default new CommentService();