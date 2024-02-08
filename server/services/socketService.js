const {SocketDAL} = require('../dal/socketDAL')

class SocketService {
    static async deleteSocket(userId, socketId) {
        try {
            
            const cnt = await SocketDAL.deleteSocket(userId, socketId)
            return !cnt
        } catch(e) {
            throw e
        } 
    }
    static async setSocket(userId, socketId) {
        try {
            
            const id = await SocketDAL.setSocket(userId, socketId) 
            if (!id) throw new Error(`socket hasn't been set`)
            return id
        } catch(e) {
            throw e
        } 
    }
}

module.exports = {SocketService}