const { OnlineDAL } = require("../dal/onlineDAL")


class OnlineService {
    static async getOnline() {
        try {
            const onlineIds = await OnlineDAL.getOnline()
            return onlineIds
        } catch(e) {
            throw e
        }
    }
}

module.exports = {OnlineService}