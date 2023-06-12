import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: 'https://backendgofit-production.up.railway.app/',
    // baseURL: 'http://localhost:8082/',
      headers:{
        'Content-Type': 'application/json',
        // 'Authorization': Cookies.get('token') || '',
         authorization: Cookies.get('token') || '',
      }
});

export default api;
