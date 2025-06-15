import axios, { AxiosInstance } from 'axios';
import { environment } from './environments/environment';

const API: AxiosInstance = axios.create({
    baseURL: environment.apiUrl,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Accept': 'application/json'
    }
});

// Add request interceptor to add authorization header
API.interceptors.request.use(
    config => {
        // Get token from sessionStorage
        const tokenStr = sessionStorage.getItem('auth_token');
        if (tokenStr) {
            try {
                const token = JSON.parse(tokenStr);
                // Add authorization header
                config.headers.Authorization = `${token.token_type} ${token.access_token}`;
            } catch (e) {
                console.error('Error parsing token:', e);
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
API.interceptors.response.use(
    response => response,
    error => {
        // Log the error for debugging
        console.error('API Error:', error);

        // Add more context to the error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.log('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Request error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default API;
