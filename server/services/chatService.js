const { getFriendsDAL, setSocketDAL, deleteSocketDAL, getMessagesDAL } = require('../dal/chatDAL.js')

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
function getMessagesService(userId, friendId) {
    try {
       const result = getMessagesDAL(userId, friendId);
       return {messages: result};

    } catch(e) {
        throw e;
    }
}

module.exports = {getFriendsService, setSocketService, deleteSocketService, getMessagesService}