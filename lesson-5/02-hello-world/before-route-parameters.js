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

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(morgan('common'));

app.locals.currentPathClass = (path, currentPath) => (path === currentPath ? 'current' : '');

app.get('/', (_req, res) => {
  res.redirect('/english');
});

// Refactoring each of these routes ...

// app.get('/english', (req, res) => {
//   res.render('hello-world-english', {
//     countries: COUNTRY_DATA,
//     currentPath: req.path,
//     language: 'en-US',
//   });
// });

// app.get('/french', (req, res) => {
//   res.render('hello-world-french', {
//     countries: COUNTRY_DATA,
//     currentPath: req.path,
//     language: 'fr-FR',
//   });
// });

// app.get('/serbian', (req, res) => {
//   res.render('hello-world-serbian', {
//     countries: COUNTRY_DATA,
//     currentPath: req.path,
//     language: 'sr-Cyrl-rs',
//   });
// });

// ... to use a function that returns the correct route callback:

const helloWorld = (view, language) => (req, res) => {
  res.render(view, {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language,
  });
};

app.get('/english', helloWorld('hello-world-english', 'en-US'));
app.get('/french', helloWorld('hello-world-french', 'fr-FR'));
app.get('/serbian', helloWorld('hello-world-serbian', 'sr-Cyrl-rs'));

app.listen(3000, 'localhost', () => {
  console.log('Listening to port 3000.');
});
