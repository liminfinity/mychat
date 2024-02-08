const {Router} = require('express');
const { chatSetMessages } = require('../controllers/chatController');
const {SocketController} = require('../controllers/socketController');
const { OnlineController } = require('../controllers/onlineController');
const { FriendController } = require('../controllers/friendController');
const { MessageController } = require('../controllers/messageController');
const { UserController } = require('../controllers/userController');
const chatRouter = Router();

chatRouter.route('/friends')
        .get(FriendController.getFriends)

chatRouter.route('/sockets')
        .post(SocketController.setSocket)
        .delete(SocketController.deleteSocket)
        .get(SocketController.getSockets)

chatRouter.route('/messages')
        .get(MessageController.getMessages)
        .post(MessageController.setMessage)

chatRouter.route('/online')
                .get(OnlineController.getOnline)

chatRouter.route('/users')
                .get(UserController.getUsers)

module.exports.chatRouter = chatRouter;