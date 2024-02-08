const {Schema, model} = require('mongoose');
const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'messages',
    versionKey: false
})
const messageModel = model('Message', messageSchema)
module.exports = {messageModel}