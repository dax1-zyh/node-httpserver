import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";

let server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    console.log('request.method')
    console.log(request.method)
    console.log('request.url')
    console.log(request.url)
    console.log('request.headers')
    console.log(request.headers)
    response.end('hi');
    const array = [];

    request.on('data', (chunk) => {
        array.push(chunk);
    });
    request.on('end', () => {
        const body = Buffer.concat(array).toString();
        console.log('body');
        console.log(body);
        response.end('all over');
    });

});

server.listen(8888, () => {
    console.log(server.address())
});







