const { MessageService } = require("../services/messageService");

class MessageController {
    static async getMessages(req, res) {
        try {
            const {userId, partnerId} = req.query;
            if (!userId || !partnerId) throw new Error("the user or partner for searching their messages haven't been gotten");
            const messages = await MessageService.getMessages(userId, partnerId);
            res.status(200).json({messages})
            
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
    static async setMessage(req, res) {
        try {
            const {message} = req.body;
            if (!message) throw new Error("the message haven't been gotten");
            const messageId = await MessageService.setMessage(message);
            res.status(200).json({messageId})
            
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
}

module.exports = {MessageController}