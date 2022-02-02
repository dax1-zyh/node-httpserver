import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from 'path'
import * as url from "url";

let server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');   // 绝对路径

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url: path, headers} = request
    if (method !== 'GET') {    // 禁止非get请求
        response.statusCode = 405;
        response.end();
        return;
    }
    const {pathname, search} = url.parse(path);  // 防止路径后加入参数 获取不到真正的路径
    let filename = pathname.substr(1);
    if (filename === '') {
        filename = 'index.html';
    }
    fs.readFile(p.resolve(publicDir, filename), (error, data) => {
        if (error) {
            if (error.errno === -4058) {
                response.statusCode = 404;
                fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
                    response.end(data)
                })
            } else if (error.errno === -4068) {
                response.statusCode = 403;
                response.end('无权查看目录内容');
            } else {
                response.statusCode = 500;
                response.end('服务器繁忙，请稍候');
            }
        } else {
            // 返回文件内容
            response.setHeader('Cache-Control', 'public,max-age=31536000'); // 缓存内容
            response.end(data);
        }
    });

});

server.listen(8888, () => {
});







