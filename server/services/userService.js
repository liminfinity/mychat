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
            const hasBuffer = editedUser.avatarBuffer.length
            const relAvatar = getRelativeAvatarURL(editedUser.avatar)
            const correctEditedUser = {...editedUser, avatar: hasBuffer ? `${editedUser.id}=${Math.random()}.png` : relAvatar, avatarBuffer: undefined};
            const isUnknownAvatar = relAvatar === 'unknown.png';
            if (!isUnknownAvatar && hasBuffer) {
                fs.unlinkSync(`assets\\userAvatars\\${relAvatar}`);
            }
            const urlToImg = `assets\\userAvatars\\${correctEditedUser.avatar}`;
            if (hasBuffer) {
                fs.writeFileSync(urlToImg, Buffer.from(new Uint8Array(editedUser.avatarBuffer)));
            }
            await UserDAL.editUser(correctEditedUser)
            return {...correctEditedUser, avatar: createAvatarURL(correctEditedUser.avatar)}; 
        } catch(e) {
            throw e
        }
        
    }
}

module.exports = {UserService}