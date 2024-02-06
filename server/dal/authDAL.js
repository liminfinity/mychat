const { getUserByEmail } = require("../utils/users");
const {connect, disconnect} = require('mongoose')
const {userModel} = require('../schemas/userSchema')
require('dotenv').config()


class AuthDAL {
    static async connect() {
        try {
            await connect(process.env.MONGO_URL);
        } catch(e) {
            throw e
        }
    }
    static async disconnect() {
        try {
            await disconnect()
        } catch(e) {
            throw e
        }
    }
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