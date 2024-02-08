const {Schema, model} = require('mongoose');
const roomSchema = new Schema({
    participants: {
        type: [String],
        required: true
    },
    messages: {
        type: [String],
        required: true
    },
    
}, {
    collection: 'rooms',
    versionKey: false
})
const roomModel = model('Room', roomSchema)
module.exports = {roomModel}