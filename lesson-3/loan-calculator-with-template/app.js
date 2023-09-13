// Example URL:
// http://localhost:3000/?amount=5000&duration=10

const HTTP = require('http');
const { URL } = require('url');
const HANDLEBARS = require('handlebars');

const PORT = 3000;

const SOURCE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Loan Calculator</title>
    <style type="text/css">
      body {
        background: rgba(250, 250, 250);
        font-family: sans-serif;
        color: rgb(50, 50, 50);
      }

      article {
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;
        padding: 1rem 2rem;
      }

      h1 {
        font-size: 2.5rem;
        text-align: center;
      }

      table {
        font-size: 1.5rem;
      }

      th {
        text-align: right;
      }

      td {
        text-align: center;
      }
      
      th,
      td {
        padding: 0.5rem;
      }
    </style>
  </head>
  <body>
    <article>
      <h1>Loan Calculator</h1>
      <table>
        <tbody>
          <tr>
            <th>Amount:</th>
            <td>
              <a href="/?amount={{amountDecrement}}&duration={{duration}}">- $100</a>
            </td>
            <td>$ {{amount}}</td>
            <td>
              <a href="/?amount={{amountIncrement}}&duration={{duration}}">+ $100</a>
            </td>
          </tr>
          <tr>
            <th>Duration:</th>
            <td>
              <a href="/?amount={{amount}}&duration={{durationDecrement}}">- 1 year</a>
            </td>
            <td>{{duration}} years</td>
            <td>
              <a href="/?amount={{amount}}&duration={{durationIncrement}}">+ 1 year</a>
            </td>
          </tr>
          <tr>
            <th>APR:</th>
            <td colspan="3">{{apr}}%</td>
          </tr>
          <tr>
            <th>Monthly payment:</th>
            <td colspan="3">$ {{payment}}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </body>
</html>
`;

const LOAN_OFFER_TEMPLATE = HANDLEBARS.compile(SOURCE);

function render(template, data) {
  const html = template(data);
  return html;
}

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
  const data = {};

  data.amount = Number(params.get('amount'));
  data.amountIncrement = data.amount + 100;
  data.amountDecrement = data.amount - 100;

  data.duration = Number(params.get('duration'));
  data.durationIncrement = data.duration + 1;
  data.durationDecrement = data.duration - 1;

  data.apr = APR;
  data.payment = calculateMonthlyPayment(data.amount, data.duration, APR).toFixed(2);

  return data;
}

const SERVER = HTTP.createServer((req, res) => {
  const { url: path } = req;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    const data = createLoanOffer(getParams(path));
    const content = render(LOAN_OFFER_TEMPLATE, data);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(`${content}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
