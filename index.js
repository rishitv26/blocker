const http = require("http");
const Unblocker = require("unblocker");

const unblocker = Unblocker({prefix: "/r/"});

const server = http.createServer(function (req, res) {
        unblocker(req, res, function (err) {
            const headers = {"content-type": "text/plain"};
            if (err) {
                res.writeHead(500, headers);
                return res.end(err.stack || err);
            }
            if (req.url === "/") {
                res.writeHead(200, headers);
                return res.end(
                    "use https://thissite.com/r/https://site-i-want.com/"
                );
            } else {
                res.writeHead(404, headers);
                return res.end("Error 404: file not found.");
            }
        });
    }).listen(8080);

// allow unblocker to proxy websockets
server.on("upgrade", unblocker.onUpgrade);

console.log("proxy server live at http://localhost:8080/");
