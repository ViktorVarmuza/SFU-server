const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
const mediasoup = require("mediasoup");


const onlineUsers = new Map();

const rooms = new Map();


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
    });

    server.listen(3000, () => {
        console.log('Server running on port 3000');
    });


})();



app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/room/${uuidV4()}`);
});

app.get('/room/:room', async (req, res) => {
    if (!rooms.has(req.params.room)) {

        const router = await worker.createRouter({
            mediaCodecs
        });

        rooms.set(req.params.room, {
            roomPath: `/room/${req.params.room}`,
            router,
            users: new Set([]),
            transports: new Map(),
            producers: new Map(),
            consumers: new Map()
        });
    }

    if (!req.params.room || !req.query.userId) {
        res.render('invalid');
        return;
    }

    res.render('room', {
        roomId: req.params.room,
        userId: req.query.userId || 0

    });
});


io.on('connection', socket => {

    socket.on('vs-online', (userData) => {
        onlineUsers.set(userData.userId, {
            socketId: socket.id,
            ...userData
        });

        console.log('User connected:', userData);
    });



    socket.on('vs-disconnect', () => {
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



    socket.on('createRoom', async (userId) => {
        const user = onlineUsers.get(userId);
        if (user) {
            const roomId = uuidV4();
            const roomPath = `/room/room-${uuidV4()}`;

            const router = await worker.createRouter({
                mediaCodecs
            });

            rooms.set(roomId, {
                roomPath,
                router,
                users: new Set([userId]),
                transports: new Map(),
                producers: new Map(),
                consumers: new Map()
            });

            socket.emit('roomCreated', { roomPath, roomId });
        }
    })


    socket.on('inviteUser', ({ fromUserId, roomPath, roomId, toUserIds }) => {
        if (!rooms.has(roomId) || !toUserIds || !onlineUsers.has(fromUserId)) return;


        toUserIds.forEach(userId => {
            const user = onlineUsers.get(userId);
            if (!user) return;

            io.to(user.socketId).emit('invitedToRoom', {
                fromUserId,
                roomPath
            });
        });
    });

    socket.on('join-room', ({ roomId, userId }) => {
        socket.join(roomId);


        socket.peerId = userId;
        socket.roomId = roomId;

        const room = rooms.get(roomId);


        if (room) {
            room.users.add(userId);
            console.log('Current users in room:');
            console.log([...room.users]);
        }


        console.log(`User ${userId} joined room ${roomId}`);
    });


    socket.on('getRtpCapabilities', ({ roomId }, callback) => {
        const room = rooms.get(roomId);
        if (!room) return;

        callback(room.router.rtpCapabilities);
    });




    socket.on('createWebRtcTransport', async ({ roomId, direction }, callback) => {
        const room = rooms.get(roomId);
        if (!room) return;


        const transport = await room.router.createWebRtcTransport({
            listenIps: [{ ip: '0.0.0.0', announcedIp: null }],
            enableUdp: true,
            enableTcp: true,
            preferUdp: true,
            appData: {
                userId: socket.peerId,
                direction
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

    socket.on('connectTransport', async ({ roomId, transportId, dtlsParameters }, callback) => {
        const room = rooms.get(roomId);
        if (!room) return;

        const transport = room.transports.get(transportId);
        if (!transport) return;

        await transport.connect({ dtlsParameters });
        callback();
    });

    socket.on('produce', async ({ roomId, transportId, kind, rtpParameters }, callback) => {
        const room = rooms.get(roomId);
        if (!room) return;

        const transport = room.transports.get(transportId);
        if (!transport) return;

        const producer = await transport.produce({
            kind,
            rtpParameters
        });

        room.producers.set(producer.id, producer);

        // 🔥 DŮLEŽITÉ – oznámit ostatním
        socket.to(roomId).emit('new-producer', {
            producerId: producer.id
        });

        callback({ producerId: producer.id });
    });

    socket.on('getProducers', ({ roomId }, callback) => {
        const room = rooms.get(roomId);
        if (!room) return callback([]);

        callback([...room.producers.keys()]);
    });


    socket.on('consume', async ({ roomId, transportId, producerId, rtpCapabilities }, callback) => {
        const room = rooms.get(roomId);
        const router = room.router;

        if (!router.canConsume({ producerId, rtpCapabilities })) return;

        const transport = room.transports.get(transportId);

        const consumer = await transport.consume({
            producerId,
            rtpCapabilities,
            paused: false
        });

        room.consumers.set(consumer.id, consumer);

        callback({
            id: consumer.id,
            producerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters
        });
    });

    socket.on('resume-consumer', async ({ roomId, consumerId }, callback) => {
        const room = rooms.get(roomId);
        const consumer = room.consumers.get(consumerId);
        await consumer.resume();
        callback();
    });




    socket.on('leave-room', ({ roomId, userId }) => {

        const room = rooms.get(roomId);
        if (room) {
            room.users.delete(userId);
            console.log(`User ${userId} left room ${roomId}`);
            socket.to(roomId).emit('user-disconnected', userId);
        }


    });



})


