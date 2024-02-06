const {Schema, model} = require('mongoose');
const userShema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    rooms: {
        type: Array
    }
}, {
    collection: 'users'
})
const userModel = model('User', userShema)
module.exports = {userModel}