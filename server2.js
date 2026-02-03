const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
const mediasoup = require("mediasoup");



const onlineUsers = new Map();
const rooms = new Map();
let worker;


const mediaCodecs = [
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
];

(async () => {
    worker = await mediasoup.createWorker({
        logLevel: 'error',
        rtcMinPort: 2000,
        rtcMaxPort: 2020
    })

    server.listen(3000, () => {
        console.log('Server running on port 3000');
    })

})();

app.set('view engine', 'ejs');

// Sdílení UMD build z node_modules
app.use('/libs', express.static('node_modules/mediasoup-client/umd'));

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.redirect(`/room/${uuidV4()}?userId=${uuidV4()}`);
});

async function createRoom(roomId, roomPath) {
    const router = await worker.createRouter({
        mediaCodecs
    });

    rooms.set(roomId, {
        roomPath: roomPath,
        router,
        users: new Set([]),
        transports: new Map(),
        producers: new Map(),
        consumers: new Map()
    });
}

app.get('/room/:room', async (req, res) => {
    if (!rooms.has(req.params.room)) {
        await createRoom(req.params.room, `/room/${req.params.room}`);

    }

    if (!req.params.room || !req.query.userId) {
        return res.render('invalid');
    }

    res.render('room', { roomId: req.params.room, userId: req.query.userId });

})


io.on('connection', socket => {

    socket.on('vs-online', (userData) => {
        onlineUsers.set(userData.userId, {
            socketId: socket.id,
            ...userData
        });
    })

    socket.on('vs-offline', (userId) => {
        if (onlineUsers.has(userId)) {
            onlineUsers.delete(userId);
        }
    })

    socket.on('create-room', async ({ userId }) => {
        if (onlineUsers.has(userId)) {
            const roomId = uuidV4();
            const roomPath = `/room/${roomId}`;
            await createRoom(roomId, roomPath);
            socket.emit('room-created', { roomId, roomPath });

        } else {
            socket.emit('error', { message: 'User not online' });
        }

    })
    socket.on('invite-user', ({ roomPath, userId, targetId }) => {
        targetId.forEach(user => {
            if (onlineUsers.has(user)) {
                const targetSocketId = onlineUsers.get(user).socketId;
                io.to(targetSocketId).emit('invitation', {
                    roomPath,
                    from: userId
                });
            }
        });
    })

    socket.on('join-room', ({ roomId, userId }) => {
        socket.join(roomId);

        socket.userId = userId;
        socket.roomId = roomId;
        const room = rooms.get(roomId);

        if (room) {
            room.users.add(userId);
            socket.to(roomId).emit('user-connected', userId);
        }
    })

    socket.on('getRtpCapabilities', ({ roomId }, callback) => {
        const room = rooms.get(roomId);
        if (!room) return;

        callback(room.router.rtpCapabilities);
    });

    socket.on('createWebRtcTransport', async ({ roomId }, callback) => {
        const room = rooms.get(roomId);

        if (!room) return;

        const transport = await room.router.createWebRtcTransport({
            listenIps: [{ ip: '0.0.0.0', announcedIp: null }],
            enableUdp: true,
            enableTcp: true,
            preferUdp: true,
            appData: {
                userId: socket.userId,
                direction: 'send'
            }
        });


        room.transports.set(transport.id, transport);

        callback({
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters
        });


    })



    socket.on('leave-room', ({ roomId, userId }) => {
        const room = rooms.get(roomId);
        if (room) {
            room.users.delete(userId);
            socket.to(roomId).emit('user-disconnected', userId);
        }


    })





})