const { getFriends, setSocket, deleteSocket, getMessages } = require("../utils/users");


function getFriendsDAL(userId, query) {
    try {
        const friends = getFriends(userId, query);
        if (!friends) throw new Error("enter existing user id");
        return friends;
        
    } catch(e) {
        throw e;
    }
}

function setSocketDAL(userId, socketId) {
    try {
       setSocket(userId, socketId);
       return true;

    } catch(e) {
        throw e;
    }
}
function deleteSocketDAL(userId) {
    try {
       deleteSocket(userId);
       return true;

    } catch(e) {
        throw e;
    }
}
function getMessagesDAL(userId, friendId) {
    try {
       const result = getMessages(userId, friendId);
       if (!result) throw new Error('dialog not found')
       return result;

    } catch(e) {
        throw e;
    }
}

module.exports = {getFriendsDAL, setSocketDAL, deleteSocketDAL, getMessagesDAL}