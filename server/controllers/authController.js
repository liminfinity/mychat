const { AuthService } = require("../services/authService");

class AuthController {
    static async logIn(req, res) {
        try {
            const auth = req.body?.auth;
            if (!auth) throw new Error("data of user haven't been gotten");
            const user = await AuthService.logIn(auth);
            res.status(200).json(user);
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
    static async signUp(req, res) {
        try {
            const {newUser} = req.body;
            if (!newUser) throw new Error("data of new user haven't been gotten");
            const user = await AuthService.signUp(newUser);
            res.status(200).json(user);
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
}


module.exports = {AuthController}