const {Router} = require('express');
const { chatGetMessages, chatSetMessages } = require('../controllers/chatController');
const {SocketController} = require('../controllers/socketController');
const { OnlineController } = require('../controllers/onlineController');
const { FriendController } = require('../controllers/friendController');
const chatRouter = Router();

chatRouter.route('/friends')
        .get(FriendController.getFriends)

chatRouter.route('/sockets')
        .post(SocketController.setSocket)
        .delete(SocketController.deleteSocket)

chatRouter.route('/messages')
        .get(chatGetMessages)
        .post(chatSetMessages)
chatRouter.route('/online')
                .get(OnlineController.getOnline)

module.exports.chatRouter = chatRouter;