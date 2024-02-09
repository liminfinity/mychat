const {Router} = require('express');
const { authRouter } = require('./authRouter');
const { chatRouter } = require('./chatRouter');
const { userRouter } = require('./userRouter');

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/chat', chatRouter);
mainRouter.use('/user', userRouter);

module.exports = {mainRouter};