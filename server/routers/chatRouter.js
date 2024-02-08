const {Router} = require('express');
const { chatGetFriends, chatSetSocket, chatDeleteSocket, chatGetMessages, chatSetMessages, chatGetSocket } = require('../controllers/chatController');
const {SocketController} = require('../controllers/socketController');
const { OnlineController } = require('../controllers/onlineController');
const chatRouter = Router();

chatRouter.route('/friends')
        .get(chatGetFriends)

chatRouter.route('/sockets')
        .post(SocketController.setSocket)
        .delete(SocketController.deleteSocket)

chatRouter.route('/messages')
        .get(chatGetMessages)
        .post(chatSetMessages)
chatRouter.route('/online')
                .get(OnlineController.getOnline)

module.exports.chatRouter = chatRouter;