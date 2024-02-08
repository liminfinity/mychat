const { messageModel } = require('../schemas/messageSchema');
const { roomModel } = require('../schemas/roomSchema');
const { userModel } = require('../schemas/userSchema');
const { createAvatarURL } = require('../utils/users');
const {DAL} = require('./DAL')
const {Types} = require('mongoose')

class FriendDAL extends DAL {
    static async getRoom(userId, partnerId) {
        const room = await roomModel.findOne({participants: {$all: [userId, partnerId]}});
        return room
    }
    static async getFreinds(userId, query) {
        try {
            const friends = []
            const rooms = await roomModel.find({participants: userId});
            for (const room of rooms) {
                const friendId = room.participants.filter(id => id != userId)[0]
                const friend = await userModel.findOne({_id: new Types.ObjectId(friendId)})
                const username = `${friend.lastName} ${friend.firstName}`.toLowerCase();

                if (username.includes(query) || username.split(' ').reverse().join(' ').includes(query)) {
                    const messages = await messageModel.find({_id: {$in: room.messages.map(messId => new Types.ObjectId(messId))}});
                    const notRead = messages.filter(mess => !mess.read).length;
                    friends.push({
                        id: friend._id,
                        ...friend._doc,
                        _id: undefined,
                        password: undefined,
                        avatar: createAvatarURL(friend.avatar),
                        rooms: undefined,
                        lastMessage: messages[messages.length - 1],
                        notRead,
                    })
                }
                
            }
            return friends
        } catch(e) {
            throw e
        }  
    }
}

module.exports = {FriendDAL}