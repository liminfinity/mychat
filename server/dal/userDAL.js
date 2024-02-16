const { Types } = require("mongoose");
const { userModel } = require("../schemas/userSchema");
const {DAL} = require('./DAL')

class UserDAL extends DAL {
    static async getUsers(userId, query) {
        try {
            const users = await userModel.find({_id: {$ne: new Types.ObjectId(userId)}});
            
            return users.filter(user => {
                const username = `${user.lastName} ${user.firstName}`.toLowerCase();
                if (username.includes(query) || username.split(' ').reverse().join(' ').includes(query)) {
                    return true
                }
                else {
                    return false
                }
            });
        } catch(e) {
            throw e                                                                       
        } 
    }
    static async editUser(editedUser) {
        try {
            const {modifiedCount} = await userModel.updateOne({_id: editedUser.id}, {...editedUser, id: undefined})
            return modifiedCount
        } catch(e) {
            throw e                                                                       
        } 
    }
}

module.exports = {UserDAL}