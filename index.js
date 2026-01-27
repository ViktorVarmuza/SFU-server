const mediasoup = require("mediasoup");
const http = require("http");
const { env } = require("process");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // načtení HTML
        const filePath = path.join(__dirname, 'views/index.html');

        readFile(filePath).then(data => {
            response(res, data);
        })

    } else if (req.urlStartsWith('/room')) {
        const filePath = path.join(__dirname, 'views/room.html');
        
        http.get.redirect(`/room/${uuid()}`);
        readFile(filePath).then(data => {
            response(res, data);
        })

    } else {
        // fallback pro jiné URL
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Mediasoup Server is running\n');
    }
});



function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

}

function response(res, data) {
    if (data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading index.html\n');
    }

}


const PORT = env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});