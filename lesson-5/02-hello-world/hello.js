const express = require('express');
const morgan = require('morgan');

const app = express();

const COUNTRY_DATA = [
  {
    path: '/english',
    flag: 'flag-of-United-States-of-America.png',
    alt: 'US Flag',
    title: 'Go to US English site',
  },
  {
    path: '/french',
    flag: 'flag-of-France.png',
    alt: 'Drapeau de la france',
    title: 'Aller sur le site français',
  },
  {
    path: '/serbian',
    flag: 'flag-of-Serbia.png',
    alt: 'Застава Србије',
    title: 'Идите на српски сајт',
  },
];

const LANGUAGE_CODES = {
  english: 'en-US',
  french: 'fr-FR',
  serbian: 'sr-Cryl-rs',
};

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(morgan('common'));

app.locals.currentPathClass = (path, currentPath) => (path === currentPath ? 'current' : '');

app.get('/', (_req, res) => {
  res.redirect('/english');
});

app.get('/:language', (req, res, next) => {
  const { language } = req.params;
  const languageCode = LANGUAGE_CODES[language];

  if (!languageCode) {
    next(new Error(`Language not supported: ${language}`));
  } else {
    res.render(`hello-world-${language}`, {
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: languageCode,
    });
  }
});

// (To disable error for `_next` as 4th argument to middleware function):
/* eslint-disable-next-line no-unused-vars */
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

app.listen(3000, 'localhost', () => {
  console.log('Listening to port 3000.');
});
