const { UserDAL } = require("../dal/userDAL");
const { createAvatarURL, getRelativeAvatarURL } = require("../utils/users");

class UserService {
    static async getUsers(userId, query = '') {
        try {
           const users = await UserDAL.getUsers(userId, query.toLowerCase().trim());
           return users.map(user => {
            return {
                id: user._id,
                ...user._doc,
                _id: undefined,
                email: undefined,
                password: undefined,
                avatar: createAvatarURL(user.avatar)
            }
           });
        } catch(e) {
            throw e;
        }
    }
    static async editUser(editedUser) {
        try {
            const copyEditedUser = {...editedUser, avatar: getRelativeAvatarURL(editedUser?.avatar)}
            
            const cnt = await UserDAL.editUser(copyEditedUser)
            if (!cnt) throw new Error(`user doesn't updated`)
            return editedUser;
        } catch(e) {
            throw e
        } 
        
    }
}

module.exports = {UserService}