require('dotenv').config()


function createAvatarURL(avatar = 'unknown.png') {
    return `http://localhost:${process.env.SERVER_PORT}/assets/img/${avatar}`;
}

module.exports = {createAvatarURL}