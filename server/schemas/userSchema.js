const {Schema, model} = require('mongoose');
const userSchema = new Schema({
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
    collection: 'users',
    versionKey: false
})
const userModel = model('User', userSchema)
module.exports = {userModel}