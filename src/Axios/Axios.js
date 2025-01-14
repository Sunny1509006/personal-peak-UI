// src/axiosInstance.js
import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://personalpeak360.biddabuzz.com/api/v1', // Replace with your actual base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Axios;
