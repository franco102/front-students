// api.js
import axios from 'axios';
const apiEndpoint = import.meta.env.VITE_API_URL;

const apiStudents = axios.create({
  baseURL: apiEndpoint,  // Cambia esta URL por la de tu API
  headers: {
    'Content-Type': 'application/json', 
  },
});
 

 

export default apiStudents;