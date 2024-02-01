const { getFriendsService } = require("../services/chatService");

function chatGetFriends(req, res) {
    try {
        const userId = +req.query?.userId;
        const query = req.query?.q;
        if (!userId) throw new Error("the user for searching his friends hasn't been gotten");
        const result = getFriendsService(userId, query);
        console.info(result)
        res.status(200).json(result)
    } catch(e) {
        res.status(404).json({message: e.message})
    }
}


module.exports = {chatGetFriends}