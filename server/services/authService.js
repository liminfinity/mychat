const { AuthDAL } = require('../dal/authDAL');
require('dotenv').config()


class AuthService {
    static async logIn({email, password}) {
        try {
            const user = await AuthDAL.logIn({email, password})
            if (!user) throw new Error(`user doesn't exist`)
            user.avatar = `http://localhost:${process.env.SERVER_PORT}/assets/img/${user.avatar}`;
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