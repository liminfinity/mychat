const { DAL } = require("./DAL")
const { socketModel } = require('../schemas/socketSchema')


class SocketDAL extends DAL {
    static async deleteSocket(userId, socketId) {
        try {
            await socketModel.deleteOne({userId, socketId})
            const cnt = await socketModel.find({userId}).countDocuments();
            return cnt
        } catch(e) {
            throw e
        } 
    }
    static async setSocket(userId, socketId) {
        try {
            
            const {id} = await socketModel.create({userId, socketId})
            return id
        } catch(e) {
            throw e
        } 
    }
}

module.exports = {SocketDAL}