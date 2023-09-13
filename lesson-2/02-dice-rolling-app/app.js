// Example URL:
// http://localhost:3000/?rolls=4&sides=6

const HTTP = require('http');
const URL = require('url').URL;

const PORT = 3000;

function getParams(path) {
  const url = new URL(path, `http://localhost:${PORT}`);
  return url.searchParams;
}

function dieRoll(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice(params) {
  const rolls = Number(params.get('rolls'));
  const sides = Number(params.get('sides'));
  let body = '';

  for (let count = 1; count <= rolls; count += 1) {
    body += `${dieRoll(1, sides)}\n`;
  }
  return body;
}

const SERVER = HTTP.createServer((req, res) => {
  const { method, url: path } = req;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    const content = rollDice(getParams(path));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`${content}\n`);
    res.write(`${method} ${path}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
