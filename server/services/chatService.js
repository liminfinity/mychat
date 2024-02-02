const { getFriendsDAL, setSocketDAL, deleteSocketDAL, getMessagesDAL, setMessagesDAL, getSocketDAL } = require('../dal/chatDAL.js');
const {nanoid} = require('nanoid')

function getFriendsService(userId, query = '') {
    try {
       const result = getFriendsDAL(userId, query);
       return {friends: result};

    } catch(e) {
        throw e;
    }
}

function setSocketService(userId, socketId) {
    try {
       const result = setSocketDAL(userId, socketId);
       return {success: result};

    } catch(e) {
        throw e;
    }
}
function deleteSocketService(userId) {
    try {
       const result = deleteSocketDAL(userId);
       return {success: result};

    } catch(e) {
        throw e;
    }
}
function getSocketService(userId) {
    try {
       const result = getSocketDAL(userId);
       return {[userId ? 'socket' : 'onlineUsers']: result};

    } catch(e) {
        throw e;
    }
}
function getMessagesService(userId, friendId) {
    try {
       const result = getMessagesDAL(userId, friendId);
       return {messages: result};

    } catch(e) {
        throw e;
    }
}
function setMessagesService(message) {
    try {
        const messageForBD = {
            id: nanoid(8),
            ...message
        }
       const result = setMessagesDAL(messageForBD);
       return {messageId: result};

    } catch(e) {
        throw e;
    }
}

module.exports = {getFriendsService, setSocketService, deleteSocketService, getMessagesService, setMessagesService, getSocketService}