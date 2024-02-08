const { MessageDAL } = require("../dal/messageDAL");

class MessageService {
    static async getMessages(userId, partnerId) {
        try {
           const messages = await MessageDAL.getMessages(userId, partnerId);
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
}

module.exports = {MessageService}