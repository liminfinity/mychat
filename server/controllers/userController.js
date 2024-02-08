const { UserService } = require("../services/userService");

class UserController {
    static async getUsers(req, res) {
        try {
            const {userId, q} = req.query;
            if (!userId) throw new Error("the user for searching hasn't been gotten");
            const users = await UserService.getUsers(userId, q);
            res.status(200).json({users})
            
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
}

module.exports = {UserController}