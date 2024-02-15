const {Router} = require('express');
const { UserController } = require('../controllers/userController');

const userRouter = Router();

userRouter.route('/')
            .put(UserController.editUser)


module.exports = {userRouter};

