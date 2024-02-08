const { socketModel } = require("../schemas/socketSchema");
const {DAL} = require('./DAL')

class OnlineDAL extends DAL {
    static async getOnline() {
        try {
            const onlineIds = await socketModel.find({}).distinct('userId')
            return onlineIds
        } catch(e) {
            throw e
        }  
    }
}

module.exports = {OnlineDAL}