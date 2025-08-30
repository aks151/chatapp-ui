import axios from 'axios';

// const API_URL = 'http://192.168.0.100:3001'
const API_URL = 'https://chat-app-backend-0n18.onrender.com'

let instance;
try {
    instance  = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
          }
    })
    
    console.log('Axios instance created with base URL:', API_URL);

} catch(error){
    console.error('Error creating axios instance:', error);
    throw error;
}



export default instance;