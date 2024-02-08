const {Schema, model, Types} = require('mongoose');
const socketSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true
    },
    socketId: {
        type: String,
        required: true
    },
    
}, {
    collection: 'sockets',
    versionKey: false
})
const socketModel = model('Socket', socketSchema)
module.exports = {socketModel}