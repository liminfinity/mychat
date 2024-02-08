const { Types } = require('mongoose');
const { messageModel } = require('../schemas/messageSchema');
const { roomModel } = require('../schemas/roomSchema');
const { DAL } = require("./DAL");


class MessageDAL extends DAL {
    static async getMessages(room) {
        try {
            const messageIds = room.messages.map(id => new Types.ObjectId(id))
            const messages = await messageModel.find({_id: {$in: messageIds}})
            return messages;
        } catch(e) {
            throw e                                                                       
        } 
    }
    static async setMessage(message) {
        const {id} = await messageModel.create(message);
        const userId = message.sender;
        const partnerId = message.recipient;
        const room = await roomModel.findOne({participants: {$all: [userId, partnerId]}})
        if (!room?._id) {
            await roomModel.create({participants: [userId, partnerId], messages: []})
        }
        await roomModel.updateOne({participants: {$all: [userId, partnerId]}}, {$push: {messages: id}})
        return id
    }
    static async readAllMessages(userId, partnerId) {
        try {
            const room = await roomModel.findOne({participants: {$all: [userId, partnerId]}});
            const messageIds = room.messages.map(id => new Types.ObjectId(id));

            const status = await messageModel.updateMany({_id: {$in: messageIds}, read: false, sender: {$ne: userId}}, {read: true})
            return status;
        } catch(e) {
            throw e                                                                       
        } 
    }
}

module.exports = {MessageDAL}