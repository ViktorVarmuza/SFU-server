import { getMediaSoupClient, createDevice } from './my-mediasoup-bundle.mjs';
const socket = io('http://localhost:3000', {
    transports: ['websocket']
});



const ms = getMediaSoupClient();
const device = createDevice();

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
    const videoTrack = stream.getVideoTracks()[0];
    const audioTrack = stream.getAudioTracks()[0];


    await sockets();
    // načtení rtpCapabilities z routeru pro device
    const rtpCapabilities = await socket.emitWithAck(
        'getRtpCapabilities',
        { roomId: ROOM_ID }
    );
    //device si načítá rtpCapabilities
    await device.load({ routerRtpCapabilities: rtpCapabilities });

    //ziskani parametru pro transport
    const sendTransportParams = await socket.emitWithAck(
        'createWebRtcTransport',
        { roomId: ROOM_ID, direction: 'send' }
    );
    //vytvoreni transportu pro send 
    const sendTransport = await createSendTransport(sendTransportParams);

    //producing video a audio tracku
    await sendTransport.produce({ track: videoTrack });
    await sendTransport.produce({ track: audioTrack});




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


async function createSendTransport(params) {
    const sendTransport = device.createSendTransport(params);

    sendTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
        socket.emit('connectTransport', {
            transportId: sendTransport.id,
            dtlsParameters: dtlsParameters,
            roomdId: ROOM_ID
        }, callback);
    });

    sendTransport.on('produce', ({ kind, rtpParameters }, callback, errback) => {
        console.log('Producing ' + kind);
        socket.emit('produce', {
            transportId: sendTransport.id,
            kind,
            rtpParameters
        }, ({ producerId }) => {
            callback({ id: producerId });
        });
    });


    return sendTransport;
}




window.addEventListener('beforeunload', () => {
    socket.emit('leave-room', { roomId: ROOM_ID, userId: USER_ID });
    socket.disconnect();
});




main();