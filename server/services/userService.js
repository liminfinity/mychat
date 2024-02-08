const { UserDAL } = require("../dal/userDAL");
const { createAvatarURL } = require("../utils/users");

class UserService {
    static async getUsers(userId, query = '') {
        try {
           const users = await UserDAL.getUsers(userId, query);
           return users.map(user => {
            return {
                id: user._id,
                ...user._doc,
                _id: undefined,
                email: undefined,
                password: undefined,
                rooms: undefined,
                avatar: createAvatarURL(user.avatar)
            }
           });
        } catch(e) {
            throw e;
        }
    }
}

module.exports = {UserService}