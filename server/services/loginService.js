const { loginDAL } = require('../dal/loginDAL');

function loginService(user) {
    try {
       const result = loginDAL(user);
       return {user: result};

    } catch(e) {
        throw e;
    }
}
module.exports = {loginService}