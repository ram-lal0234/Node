const http = require('http');
const port =4000;

const server = http.createServer((req,res)=>{
   res.setHeader('CONTENT-TYPE','text/html');
   res.end("Server running ")
})

server.listen(port)