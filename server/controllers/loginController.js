const { loginService } = require("../services/loginService");

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


module.exports = {loginController}