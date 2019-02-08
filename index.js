const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 2000;

const server = http.createServer((req, res)=> {
    res.writeHead(200, {'Content-Type':'text/html'});
    var template = fs.readFileSync('./index.html');
    res.end(template);
})

server.listen(port);
console.log(`server listening on port ${port}`);