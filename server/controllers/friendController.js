const { FriendService } = require("../services/friendService");

class FriendController {
    static async getFriends(req, res) {
        try {
            const {userId, q} = req.query;
            if (!userId) throw new Error("the user for searching his friends hasn't been gotten");
            const friends = await FriendService.getFriends(userId, q);
            res.status(200).json({friends})
            
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
}

module.exports = {FriendController}