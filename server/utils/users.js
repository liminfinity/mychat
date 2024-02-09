require('dotenv').config()


function createAvatarURL(avatar = 'unknown.png') {
    return `http://localhost:${process.env.SERVER_PORT}/assets/img/${avatar}`;
}

function getRelativeAvatarURL(avatar = `http://localhost:${process.env.SERVER_PORT}/assets/img/unknown.png`) {
    return avatar.slice(avatar.lastIndexOf('/') + 1);
}

module.exports = {createAvatarURL, getRelativeAvatarURL}