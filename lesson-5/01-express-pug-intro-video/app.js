const express = require('express');

const ACCOUNT_INFO = {
  accountBalance: '$100',
  recentTransactions: ['-$50', '+$25'],
};

const app = express();

app.set('view engine', 'pug');

app.get('/', (_req, res) => {
  res.render('index');
});

app.get('/account', (_req, res) => {
  res.render('account', ACCOUNT_INFO);
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
