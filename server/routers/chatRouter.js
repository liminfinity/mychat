const {Router} = require('express');
const { chatGetFriends } = require('../controllers/chatController');

const chatRouter = Router();

chatRouter.route('/')
        .get(chatGetFriends)

module.exports.chatRouter = chatRouter;