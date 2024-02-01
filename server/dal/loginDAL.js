const { getUserByEmail } = require("../utils/users");


function loginDAL(log_user) {
    try {
        const user = getUserByEmail(log_user.email);
        if (!user) throw new Error("enter existing user");
        return user;
        
    } catch(e) {
        throw e;
    }
}
module.exports = {loginDAL}