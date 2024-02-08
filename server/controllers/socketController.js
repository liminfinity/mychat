const {SocketService} = require('../services/socketService')

class SocketController {
    static async deleteSocket(req, res) {
        try {
            const {userId, socketId} = req.body
            if (userId === undefined || socketId === undefined) throw new Error(`there is not enough data in the body`)
            const last = await SocketService.deleteSocket(userId, socketId)
            res.status(200).json({last})
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
    static async setSocket(req, res) {
        try {
            const {userId, socketId} = req.body
            if (userId === undefined || socketId === undefined) throw new Error(`there is not enough data in the body`)
            const id = await SocketService.setSocket(userId, socketId)
            res.status(200).json({id})
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
    static async getOnlineIds(req, res) {
        try {
            const id = await SocketService.setSocket(userId, socketId)
            res.status(200).json({id})
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
}

module.exports = {SocketController}