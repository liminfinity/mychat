const { getFriendsService, setSocketService, deleteSocketService, getMessagesService, setMessagesService, getSocketService } = require("../services/chatService");

function chatGetFriends(req, res) {
    try {
        const userId = +req.query?.userId;
        const query = req.query?.q;
        if (!userId) throw new Error("the user for searching his friends hasn't been gotten");
        const result = getFriendsService(userId, query);
        res.status(200).json(result)
    } catch(e) {
        res.status(404).json({message: e.message})
    }
}

function chatSetSocket(req, res) {
    try {
        const userId = req.body.userId;
        const socketId = req.body.socketId;
        const result = setSocketService(userId, socketId);
        res.status(200).json(result)
    } catch(e) {
        res.status(404).json({message: e.message})
    }
}
function chatDeleteSocket(req, res) {
    try {
        const userId = req.body.userId;
        const result = deleteSocketService(userId);
        res.status(200).json(result)
    } catch(e) {
        res.status(404).json({message: e.message})
    }
}
function chatGetSocket(req, res) {
    try {
        const userId = +req.query?.userId;
        const result = getSocketService(userId);
        res.status(200).json(result)
    } catch(e) {
        res.status(404).json({message: e.message})
    }
}

function chatGetMessages(req, res) {
    try {
        const userId = +req.query.userId;
        const friendId = +req.query.friendId;
        const result = getMessagesService(userId, friendId);
        res.status(200).json(result)
    } catch(e) {
        res.status(404).json({message: e.message})
    }
}
function chatSetMessages(req, res) {
    try {
        const message = req.body.message;
        const result = setMessagesService(message);
        res.status(200).json(result)
    } catch(e) {
        res.status(404).json({message: e.message})
    }
}

module.exports = {chatGetFriends, chatSetSocket, chatDeleteSocket, chatGetMessages, chatSetMessages, chatGetSocket}