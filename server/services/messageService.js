const { FriendDAL } = require("../dal/friendDAL");
const { MessageDAL } = require("../dal/messageDAL");

class MessageService {
    static async getMessages(userId, partnerId) {
        try {
           const room = await FriendDAL.getRoom(userId, partnerId)
           if (!room) return []  
           const messages = await MessageDAL.getMessages(room);
           await MessageDAL.readAllMessages(userId, partnerId);
           return messages.map(message => {
            return {
                id: message._id,
                ...message._doc,
                _id: undefined
            }
           })
        } catch(e) {
            throw e;
        }
    }
    static async setMessage(message) {
        try {
           const messageId = await MessageDAL.setMessage(message)
           return messageId
        } catch(e) {
            throw e;
        }
    }
}

module.exports = {MessageService}