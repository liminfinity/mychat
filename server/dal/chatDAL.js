const { getFriends } = require("../utils/users");


function getFriendsDAL(userId, query) {
    try {
        const friends = getFriends(userId, query);
        if (!friends) throw new Error("enter existing user id");
        return friends;
        
    } catch(e) {
        throw e;
    }
}
module.exports = {getFriendsDAL}