import axios from 'axios'
import config from '../../config/default.json'
const SERVER_PORT = config['SERVER_PORT'];
const SERVER_HOST = config['SERVER_HOST'];
export const AuthConnect = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/auth`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

export const OnlineConnect = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/chat/online`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

export const FriendsConnect = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/chat/friends`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

export const MessagesConnect = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/chat/messages`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

export const UsersConnect = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/chat/users`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

export const UserConnect = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/user`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})