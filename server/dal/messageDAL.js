const { Types } = require('mongoose');
const { messageModel } = require('../schemas/messageSchema');
const { roomModel } = require('../schemas/roomSchema');
const { DAL } = require("./DAL");


class MessageDAL extends DAL {
    static async getMessages(userId, partnerId) {
        try {
            const room = await roomModel.findOne({participants: {$all: [userId, partnerId]}});
            const messageIds = room.messages.map(id => new Types.ObjectId(id))
            const messages = await messageModel.find({_id: {$in: messageIds}})
            return messages;
        } catch(e) {
            throw e                                                                       
        } 
    }
    static async readAllMessages(userId, partnerId) {
        try {
            const room = await roomModel.findOne({participants: {$all: [userId, partnerId]}});
            const messageIds = room.messages.map(id => new Types.ObjectId(id))
            const status = await messageModel.updateMany({_id: {$in: messageIds}, read: false}, {read: true})
            return status;
        } catch(e) {
            throw e                                                                       
        } 
    }
}

module.exports = {MessageDAL}