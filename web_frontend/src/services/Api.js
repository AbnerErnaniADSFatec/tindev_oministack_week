import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:1524'
});

export default api;