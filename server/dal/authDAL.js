const { getUserByEmail } = require("../utils/users");

const {userModel} = require('../schemas/userSchema');
const { DAL } = require("./DAL");


class AuthDAL extends DAL {
    
    static async logIn({email, password}) {
        try {
            const user = await userModel.findOne({email, password});
            return user
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