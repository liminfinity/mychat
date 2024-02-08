const { AuthDAL } = require('../dal/authDAL');
const { createAvatarURL } = require('../utils/users');



class AuthService {
    static async logIn({email, password}) {
        try {
            const user = await AuthDAL.logIn({email, password})
            if (!user) throw new Error(`user doesn't exist`)
            user.avatar = createAvatarURL(user.avatar);
            return user
        } catch(e) {
            throw e
        } 
        
    }
}

function loginService(user) {
    try {
       const result = loginDAL(user);
       return {user: result};

    } catch(e) {
        throw e;
    }
}
module.exports = {AuthService}