const socket = io('/', { transports: ['websocket'] });
const mediasoupClient = require('mediasoup-client');

const device = new mediasoupClient.Device();

const videoGrid = document.querySelector('.video-grid');
const roomIdDisplay = document.querySelector('.id');






const consumers = new Map(); // consumerId -> consumer
const videos = new Map()




//roomId = ROOM_ID;
//userId = USER_ID;


async function getUserMedia() {
    return await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
}


async function main() {
    const stream = await getUserMedia();
    const rtpCapabilities = await socket.emitWithAck(
        'getRtpCapabilities',
        { roomId: ROOM_ID }
    );
    console.log('RTP Capabilities:' + JSON.stringify(rtpCapabilities));

    const TransportParams = await socket.emitWithAck(
        'createWebRtcTransport',
        { roomId: ROOM_ID }
    );

    console.log('Transport params:' + JSON.stringify(TransportParams));

    await sockets();
}

async function sockets() {
    socket.emit('join-room', { roomId: ROOM_ID, userId: USER_ID });




    socket.on('user-connected', (userId) => {
        console.log('User connected: ' + userId);
    }
    );


    socket.on('user-disconnected', (userId) => {
        console.log('User disconnected: ' + userId);

    })


}


window.addEventListener('beforeunload', () => {
    socket.emit('leave-room', { roomId: ROOM_ID, userId: USER_ID });
    socket.disconnect();
});
