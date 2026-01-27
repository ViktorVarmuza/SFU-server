const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
const mediasoup = require("mediasoup");


const onlineUsers = new Map();
const usersInRooms = new Map();
const rooms = new Map();

(async () => {
    worker = await mediasoup.createWorker({
        logLevel: 'error',
        rtcMinPort: 2000,
        rtcMaxPort: 2020
    });

    router = await worker.createRouter({
        mediaCodecs: [
            {
                kind: 'audio',
                mimeType: 'audio/opus',
                clockRate: 48000,
                channels: 2
            },
            {
                kind: 'video',
                mimeType: 'video/VP8',
                clockRate: 90000
            }
        ]
    });

    console.log("Mediasoup worker and router created");
})();



app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/room/${uuidV4()}`);
});

app.get('/room/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});


io.on('connection', socket => {

    socket.on('vs-online', (userData) => {
        onlineUsers.set(userData.userId, {
            socketId: socket.id,
            ...userData
        });

        console.log('User connected:', userData);
    });



    socket.on('disconnect', () => {
        for (const [userId, user] of onlineUsers.entries()) {
            if (user.socketId === socket.id) {
                onlineUsers.delete(userId);

                // odebrat ze všech rooms
                for (const room of rooms.values()) {
                    room.users?.delete(userId);
                }

                console.log('VS Code offline:', userId);
                break;
            }
        }
    });



    socket.on('createRoom', (userId) => {
        const user = onlineUsers.get(userId);
        if (user) {
            const roomId = uuidV4();
            const roomPath = `/room/${uuidV4()}`;
            usersInRooms.set(userId, roomPath);
            rooms.set(roomPath, {
                roomId,
                users: new Set([userId])
            });

            socket.emit('roomCreated', { roomPath });
        }
    })


    socket.on('inviteUser', ({ fromUserId, roomPath, toUserIds }) => {
        if (!rooms.has(roomPath) || !toUserIds || !onlineUsers.has(fromUserId)) return;

        toUserIds.forEach(userId => {
            const user = onlineUsers.get(userId);
            if (!user) return;

            io.to(user.socketId).emit('invitedToRoom', {
                fromUserId,
                roomPath
            });
        });
    });




})


server.listen(3000, () => {
    console.log('Server running on port 3000');
});
