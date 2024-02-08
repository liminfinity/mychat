import axios from 'axios'

const SERVER_PORT = 5000;

export const AuthConnect = axios.create({
    baseURL: `http://localhost:${SERVER_PORT}/auth`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

export const OnlineConnect = axios.create({
    baseURL: `http://localhost:${SERVER_PORT}/chat/online`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

export const FriendsConnect = axios.create({
    baseURL: `http://localhost:${SERVER_PORT}/chat/friends`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})
