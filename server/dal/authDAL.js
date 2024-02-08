const { getUserByEmail } = require("../utils/users");

const {userModel} = require('../schemas/userSchema');
const { DAL } = require("./DAL");
require('dotenv').config()


class AuthDAL extends DAL {
    
    static async logIn({email, password}) {
        try {
            const users = await userModel.find({email, password});
            return users[0];
        } catch(e) {
            throw e                                                                       
        } 
    }
}
function loginDAL(log_user) {
    try {
        const user = getUserByEmail(log_user.email);
        if (!user) throw new Error("enter existing user");
        return user;
        
    } catch(e) {
        throw e;
    }
}
module.exports = {AuthDAL}