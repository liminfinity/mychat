const USERS = [
    {
        id: 1,
        email: 'polieshko04@gmail.com',
        username: 'liminfinity',
        rooms: [1, 2]
    },
    {
        id: 2,
        email: 'anna124@gmail.com',
        username: 'annakiruan',
        rooms: [1]
    },
    {
        id: 3,
        email: 'oleg212@gmail.com',
        username: 'bedolaga',
        rooms: []
    },
    {
        id: 4,
        email: 'SenyaValenkina@gmail.com',
        username: 'senya2022',
        rooms: []
    }
]
const ROOMS = [
    {
        id: 1,
        participants: [1, 2],
        messages: [
            {
                id: 1,
                sender: 1,
                content: 'Привет!',
                timestamp: new Date()
            }
        ]
    },
    {
        id: 2,
        participants: [1, 3],
        messages: [
            {
                id: 2,
                sender: 1,
                content: 'Как дела?',
                timestamp: new Date()
            }
        ]
    }
]
const SOCKETS = [
    {
        userId: 1,
        socketId: undefined
    }
]
function getFriends(userId, query) {
    const userRooms = USERS.find(user => user.id === userId).rooms;
    const filteredRooms = ROOMS.filter(room => userRooms.includes(room.id))
    const friendsIds = filteredRooms.map(room => room.participants.filter(id => id != userId)).map(friendId => friendId[0]);
    const friends = USERS.filter(user => friendsIds.includes(user.id) && user.username.includes(query));
    const friendsWithLastMessage = friends.map((friend, ind) => {
        const messages = filteredRooms[ind].messages;
        const lastMessage = messages[messages.length - 1];
        return {...friend, lastMessage, rooms: undefined}
    })
    return friendsWithLastMessage;

}
function setSocket(userId, socketId) {
    SOCKETS.push({userId, socketId})
}
function deleteSocket(userId) {
    const SocketIndex = SOCKETS.findIndex(socket => socket.userId === userId);
    SOCKETS.splice(SocketIndex, 1);
}
function getMessages(userId, friendId) {
    return ROOMS.find(room => new Set([...room.participants, userId, friendId]).size === 2)?.messages;
}
function getUserById(userId) {
    const user = USERS.find(user => user.id === userId);
    if (!user) return;
    return user;
}
function getUserByEmail(userEmail) {
    const user = USERS.find(user => user.email === userEmail);
    if (!user) return;
    return user;
}

module.exports = {getUserById, getUserByEmail, getFriends, setSocket, deleteSocket, getMessages}