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
    static async signUp(newUser) {
        try {
            const user = await userModel.findOne({email: newUser.email, password: newUser.password});
            if (user) throw new Error(`This user already exists`);
            const {id} = await userModel.create(newUser);
            if (!id) throw new Error(`The user hasn't been created`);
            return id
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