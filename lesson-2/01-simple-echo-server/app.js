// An HTTP server that sends back

const HTTP = require('http');

const PORT = 3000;

const SERVER = HTTP.createServer((req, res) => {
  const { method, url: path } = req;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    const content = `${method} ${path}\n`;

    // Can use two methods to set status code and headers:
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');

    // Or in same method:
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(content),
    });

    res.write(content);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
