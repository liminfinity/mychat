import axios from 'axios'

const SERVER_PORT = 5000;

export const AuthConnect = axios.create({
    baseURL: `http://localhost:${SERVER_PORT}/auth`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})
