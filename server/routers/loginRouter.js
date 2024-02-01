const {Router} = require('express');
const { loginController } = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.route('/')
        .post(loginController)

module.exports.loginRouter = loginRouter;