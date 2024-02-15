const { UserDAL } = require("../dal/userDAL");
const { createAvatarURL, getRelativeAvatarURL } = require("../utils/users");
const fs = require('fs')
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
            const correctEditedUser = {...editedUser, avatar: `${editedUser.id}=${Math.random()}.png`, avatarBuffer: undefined}
            const relAvatar = getRelativeAvatarURL(editedUser.avatar)
            if (relAvatar != 'unknown.png') {
                fs.unlinkSync(`assets\\userAvatars\\${relAvatar}`);
            }
            const urlToImg = `assets\\userAvatars\\${correctEditedUser.avatar}`;
            if (editedUser.avatarBuffer.length) {
                fs.writeFileSync(urlToImg, Buffer.from(new Uint8Array(editedUser.avatarBuffer)));
                await UserDAL.editUser(correctEditedUser)
                return {...correctEditedUser, avatar: createAvatarURL(correctEditedUser.avatar)}; 
                
            }
            else {
                const cnt = await UserDAL.editUser(correctEditedUser)
                if (!cnt) throw new Error(`user doesn't updated`)
                return {...correctEditedUser, avatar: createAvatarURL(correctEditedUser.avatar)};
            }
        } catch(e) {
            throw e
        }
        
    }
}

module.exports = {UserService}