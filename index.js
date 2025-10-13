const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let contType;
    if (req.url == "/"){
        contType = "text/html"
    }
    else if (req.url == "/index.css"){
        contType = "text/css"
    }
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream("index.html").pipe(res);
    res.end();
});
server.listen(8080, "localhost")