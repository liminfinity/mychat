const { OnlineService } = require('../services/onlineService')


class OnlineController {
    static async getOnline(req, res) {
        try {
            const onlineIds = await OnlineService.getOnline()
            res.status(200).json({onlineIds})
        } catch(e) {
            res.status(404).json({message: e.message})
        }
    }
}

module.exports = {OnlineController}