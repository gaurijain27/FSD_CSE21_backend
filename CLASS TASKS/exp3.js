import http from "http";
const server =http.createServer((req,res)=>{
    if(req.url=='/'){
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write('<h1>hello world</h1>');
        res.writeHead(403, { "Content-Type": "text/plain" });
    }
    res.end("<h2>403 forbidden error..........</h2>");
});
