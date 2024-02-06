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
}

function loginController(req, res) {
    try {
        const user = req.body?.user;
        if (!user) throw new Error("data of user haven't been gotten");
        const result = loginService(user);
        res.status(200).json(result)
    } catch(e) {
        res.status(404).json({message: e.message})
    }
}


module.exports = {AuthController}