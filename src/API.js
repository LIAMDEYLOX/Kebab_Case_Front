import axios from 'axios';
const API = axios.create({
    baseURL : 'https://LOCALHOST:8000/api'})
export default API;