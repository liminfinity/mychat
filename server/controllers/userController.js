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
    static async editUser(req, res) {
        try {
            const {editedUser} = req.body;
            if (!editedUser) throw new Error("data of new user haven't been gotten");
            const user = await UserService.editUser(editedUser);
            res.status(200).json(user);
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
}

module.exports = {UserController}