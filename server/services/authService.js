const { AuthDAL } = require('../dal/authDAL');
const { createAvatarURL } = require('../utils/users');



class AuthService {
    static async logIn({email, password}) {
        try {
            const user = await AuthDAL.logIn({email, password})
            if (!user) throw new Error(`user doesn't exist`)
            
            return {
                id: user._id,
                ...user._doc,
                avatar: createAvatarURL(user.avatar),
                _id: undefined
            };
        } catch(e) {
            throw e
        } 
        
    }
    static async signUp(newUser) {
        try {
            const userId = await AuthDAL.signUp(newUser)
            if (!userId) throw new Error(`user doesn't saved`)
            
            return {
                id: userId,
                ...newUser,
                avatar: createAvatarURL(),
            };
        } catch(e) {
            throw e
        } 
        
    }
}

module.exports = {AuthService}