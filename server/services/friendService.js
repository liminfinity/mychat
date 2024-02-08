const { FriendDAL } = require("../dal/friendDAL");

class FriendService {
    static async getFriends(userId, query = '') {
        try {
           const friends = await FriendDAL.getFreinds(userId, query.toLowerCase().trim());
           return friends;
        } catch(e) {
            throw e;
        }
    }
}

module.exports = {FriendService}