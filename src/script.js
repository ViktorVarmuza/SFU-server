const socket = io('/', { transports: ['websocket'] });
const device = new mediasoupClient.Device();






const videoGrid = document.querySelector('.video-grid');
const roomIdDisplay = document.querySelector('.id');

const consumers = new Map(); // consumerId -> consumer
const videos = new Map();    // producerId -> video element


roomIdDisplay.textContent = ROOM_ID;


const producers = new Map();

let sendTransport;
let recvTransport;

async function getUserMedia() {
    return await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
}

async function main() {
    const stream = await getUserMedia();

    sockets(stream);
    if (!stream) return;


    const rtpCapabilities = await socket.emitWithAck(
        'getRtpCapabilities',
        { roomId: ROOM_ID }
    );

    await device.load({ routerRtpCapabilities: rtpCapabilities });


    console.log('RTP Capabilities:' + JSON.stringify(rtpCapabilities));

    const sendTransportParams = await socket.emitWithAck(
        'createWebRtcTransport',
        { roomId: ROOM_ID, direction: 'send' }
    );

    sendTransport = device.createSendTransport(sendTransportParams);


    sendTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
        socket.emit(
            'connectTransport',
            {
                roomId: ROOM_ID,
                transportId: sendTransport.id,
                dtlsParameters
            },
            callback
        );
    });

    sendTransport.on(
        'produce',
        async ({ kind, rtpParameters }, callback, errback) => {
            try {
                const { producerId } = await socket.emitWithAck(
                    'produce',
                    {
                        roomId: ROOM_ID,
                        transportId: sendTransport.id,
                        kind,
                        rtpParameters
                    }
                );
                callback({ id: producerId });
            } catch (err) {
                errback(err);
            }
        }
    );
    const producers = await socket.emitWithAck('getProducers', {
        roomId: ROOM_ID
    });

    for (const producerId of producers) {

        await consume(producerId);
        
    }




    const videoTrack = stream.getVideoTracks()[0];
    const audioTrack = stream.getAudioTracks()[0];

    await sendTransport.produce({
        track: videoTrack,
        encodings: [{ maxBitrate: 1500000 }],
        codecOptions: { videoGoogleStartBitrate: 1000 }
    });

    await sendTransport.produce({
        track: audioTrack
    });


    socket.on('new-producer', async ({ producerId }) => {
        if (videos.has(producerId)) return;
        await consume(producerId);
    });







    const myVideo = document.createElement('video');
    myVideo.srcObject = stream;

    myVideo.muted = true;        // ❗ MUSÍ být
    myVideo.autoplay = true;
    myVideo.playsInline = true;

    videoGrid.appendChild(myVideo);
}

function sockets(stream) {
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


async function consume(producerId) {
    if (!recvTransport) {
        const params = await socket.emitWithAck(
            'createWebRtcTransport',
            { roomId: ROOM_ID, direction: 'recv' }
        );

        recvTransport = device.createRecvTransport(params);

        recvTransport.on('connect', ({ dtlsParameters }, callback) => {
            socket.emit('connectTransport', {
                roomId: ROOM_ID,
                transportId: recvTransport.id,
                dtlsParameters
            }, callback);
        });
    }

    const data = await socket.emitWithAck('consume', {
        roomId: ROOM_ID,
        transportId: recvTransport.id,
        producerId,
        rtpCapabilities: device.rtpCapabilities
    });

    const consumer = await recvTransport.consume(data);
    consumers.set(consumer.id, consumer);

    // ▶️ STREAM
    const stream = new MediaStream();
    stream.addTrack(consumer.track);

    // ▶️ VIDEO ELEMENT
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    video.playsInline = true;

    // audio jen u remote videí
    video.muted = false;

    video.dataset.producerId = producerId;

    videoGrid.appendChild(video);
    videos.set(producerId, video);

    // ▶️ RESUME
    await socket.emitWithAck('resume-consumer', {
        roomId: ROOM_ID,
        consumerId: consumer.id
    });
}


main();