const {Router} = require('express');
const { loginRouter } = require('./loginRouter');
const { chatRouter } = require('./chatRouter');

const mainRouter = Router();

mainRouter.use('/login', loginRouter);
mainRouter.use('/chat', chatRouter);

module.exports.mainRouter = mainRouter;