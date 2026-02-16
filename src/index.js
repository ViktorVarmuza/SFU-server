import { getMediaSoupClient, createDevice } from './my-mediasoup-bundle.mjs';
const socket = io('http://localhost:3000', {
    transports: ['websocket']
});


const ms = getMediaSoupClient();
const device = createDevice();


const videoGrid = document.querySelector('.video-grid');
const roomIdDisplay = document.querySelector('.id');
const toggleVideo = document.getElementById('toggle-video');


console.log(USER_ID);


let myStream;
let videoTrack;
let audioTrack;



const consumers = new Map(); // consumerId -> consumer
const videos = new Map()
let recvTransport;




//roomId = ROOM_ID;
//userId = USER_ID;


async function getUserMedia() {
    return await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,

    });
}


async function main() {
    myStream = await getUserMedia();

    videoTrack = myStream.getVideoTracks()[0];
    audioTrack = myStream.getAudioTracks()[0];

    addVideo(myStream, "username", USER_ID);
    await sockets();

    const rtpCapabilities = await socket.emitWithAck(
        'getRtpCapabilities',
        { roomId: ROOM_ID }
    );

    await device.load({ routerRtpCapabilities: rtpCapabilities });

    const sendTransportParams = await socket.emitWithAck(
        'createWebRtcTransport',
        { roomId: ROOM_ID, direction: 'send' }
    );

    const recvTransportParams = await socket.emitWithAck(
        'createWebRtcTransport',
        { roomId: ROOM_ID, direction: 'recv' }
    );

    const sendTransport = await createSendTransport(sendTransportParams);
    recvTransport = await createRecvTransport(recvTransportParams);

    // 🔥 TEĎ až můžeš získat producery
    const allProducers = await socket.emitWithAck('getAllProducers', {
        roomId: ROOM_ID
    });

    for (const { producerId, userId } of allProducers) {
        if (userId === USER_ID) continue;
        await consumeProducer(producerId, userId);
    }

    // až pak produce
    await sendTransport.produce({ track: videoTrack });
    await sendTransport.produce({ track: audioTrack });





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

    socket.on('new-producer', async ({ producerId, userId }) => {
        if (userId === USER_ID) return;
        await consumeProducer(producerId, userId);
    });




}

async function consumeProducer(producerId, userId) {

    const data = await socket.emitWithAck('consume', {
        roomId: ROOM_ID,
        producerId,
        rtpCapabilities: device.rtpCapabilities
    });

    if (data.error) {
        console.error(data.error);
        return;
    }

    const consumer = await recvTransport.consume({
        id: data.id,
        producerId: data.producerId,
        kind: data.kind,
        rtpParameters: data.rtpParameters
    });

    // 🔥 IGNORUJ AUDIO
    if (consumer.kind !== 'video') return;

    const stream = new MediaStream();
    stream.addTrack(consumer.track);

    addVideo(stream, userId, producerId);
}



async function createSendTransport(params) {
    const sendTransport = device.createSendTransport(params);

    sendTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
        socket.emit('connectTransport', {
            transportId: sendTransport.id,
            dtlsParameters: dtlsParameters,
            roomId: ROOM_ID
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

async function createRecvTransport(params) {
    const recvTransport = device.createRecvTransport(params);

    recvTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
        socket.emit('connectTransport', {
            transportId: recvTransport.id,
            dtlsParameters,
            roomId: ROOM_ID
        }, callback);
    });

    return recvTransport;


}

function addVideo(stream, username, producerId) {


    const video = document.createElement('video');

    video.srcObject = stream;
    video.playsInline = true;
    video.autoplay = true;


    const videoTile = document.createElement('div');
    videoTile.className = 'video-tile';
    videoTile.dataset.producerId = producerId;

    const nameTag = document.createElement('span');
    nameTag.className = 'username';
    nameTag.innerText = username;

    const avatar = document.createElement('img');
    avatar.src = 'user.png';
    avatar.className = 'avatar';

    video.addEventListener('loadedmetadata', () => {
        video.play();
    });

    videoTile.append(video);
    videoTile.append(avatar);
    videoTile.append(nameTag);
    videoGrid.append(videoTile);


}

let videoEnabled = true;

toggleVideo.addEventListener('click', () => {
    if (!myStream) return;

    const videoTrack = myStream.getVideoTracks()[0];
    videoEnabled = !videoEnabled;
    videoTrack.enabled = videoEnabled;

    toggleVideo.style.backgroundColor = videoEnabled ? '' : 'red';
});




window.addEventListener('beforeunload', () => {
    socket.emit('leave-room', { roomId: ROOM_ID, userId: USER_ID });
    socket.disconnect();
});




main();