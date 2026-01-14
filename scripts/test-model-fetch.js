
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/planet/scene.bin',
    method: 'HEAD',
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    if (res.statusCode === 200) {
        console.log('✅ File is accessible');
        if (res.headers['content-type']) {
            console.log(`Content-Type: ${res.headers['content-type']}`);
        }
        if (res.headers['content-length']) {
            console.log(`Content-Length: ${res.headers['content-length']}`);
        }
    } else {
        console.error('❌ File not accessible');
    }
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
