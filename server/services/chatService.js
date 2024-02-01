const { getFriendsDAL } = require('../dal/chatDAL.js')

function getFriendsService(userId, query = '') {
    try {
       const result = getFriendsDAL(userId, query);
       return {friends: result};

    } catch(e) {
        throw e;
    }
}
module.exports = {getFriendsService}