require('dotenv').config()
const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
function createAvatarURL(avatar = 'unknown.png') {
    return `http://${SERVER_HOST}:${process.env.SERVER_PORT}/assets/img/${avatar}`;
}

function getRelativeAvatarURL(avatar = `http://${SERVER_HOST}:${process.env.SERVER_PORT}/assets/img/unknown.png`) {
    return avatar.slice(avatar.lastIndexOf('/') + 1);
}

module.exports = {createAvatarURL, getRelativeAvatarURL}