const {Router} = require('express');
const { chatGetFriends, chatSetSocket, chatDeleteSocket, chatGetMessages } = require('../controllers/chatController');

const chatRouter = Router();

chatRouter.route('/friends')
        .get(chatGetFriends)

chatRouter.route('/sockets')
        .post(chatSetSocket)
        .delete(chatDeleteSocket)

chatRouter.route('/messages')
        .get(chatGetMessages)

module.exports.chatRouter = chatRouter;