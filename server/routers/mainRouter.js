const {Router} = require('express');
const { authRouter } = require('./authRouter');
const { chatRouter } = require('./chatRouter');

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/chat', chatRouter);

module.exports.mainRouter = mainRouter;