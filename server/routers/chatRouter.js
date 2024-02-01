const {Router} = require('express');
const { chatGetFriends, chatSetSocket, chatDeleteSocket, chatGetMessages, chatSetMessages, chatGetSocket } = require('../controllers/chatController');

const chatRouter = Router();

chatRouter.route('/friends')
        .get(chatGetFriends)

chatRouter.route('/sockets')
        .post(chatSetSocket)
        .delete(chatDeleteSocket)
        .get(chatGetSocket)

chatRouter.route('/messages')
        .get(chatGetMessages)
        .post(chatSetMessages)

module.exports.chatRouter = chatRouter;