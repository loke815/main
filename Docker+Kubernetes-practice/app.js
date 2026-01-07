const http = require("http");

http.createServer((req, res) => {
  res.end("Multi-stage Dockerfile practice");
}).listen(3000);

