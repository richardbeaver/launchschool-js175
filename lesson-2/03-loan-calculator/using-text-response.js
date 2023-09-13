// Example URL:
// http://localhost:3000/?amount=5000&duration=10

const HTTP = require('http');
const { URL } = require('url');

const PORT = 3000;

function getParams(path) {
  const url = new URL(path, `http://localhost:${PORT}`);
  return url.searchParams;
}

function calculateMonthlyPayment(amount, durationYears, aprPercentage) {
  const monthlyRate = (aprPercentage / 100) / 12;
  const durationMonths = durationYears * 12;
  return amount * (monthlyRate / (1 - ((1 + monthlyRate) ** (-durationMonths))));
}

function createLoanOffer(params) {
  const APR = 5;
  const amount = Number(params.get('amount'));
  const duration = Number(params.get('duration'));
  const monthlyPayment = calculateMonthlyPayment(amount, duration, APR);

  return `Amount: $${amount}\nDuration: ${duration} years\nAPR: ${APR}%\nMonthly payment: $${monthlyPayment.toFixed(2)}\n`;
}

const SERVER = HTTP.createServer((req, res) => {
  const { url: path } = req;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    const content = createLoanOffer(getParams(path));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`${content}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
