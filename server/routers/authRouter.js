const {Router} = require('express');
const { AuthController } = require('../controllers/authController');

const authRouter = Router();

authRouter.route('/login')
        .post(AuthController.logIn)
authRouter.route('/signup')
        .post(AuthController.signUp)

module.exports = {authRouter};