import axios from 'axios';

const apiService = axios.create({
    baseURL : "https://localhost:44349"
})

export default apiService;