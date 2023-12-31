const express = require('express');
const morgan = require('morgan');

const app = express();

const contactData = [
  {
    firstName: 'Mike',
    lastName: 'Jones',
    phoneNumber: '281-330-8004',
  },
  {
    firstName: 'Jenny',
    lastName: 'Keys',
    phoneNumber: '768-867-5309',
  },
  {
    firstName: 'Max',
    lastName: 'Entiger',
    phoneNumber: '214-748-3647',
  },
  {
    firstName: 'Alicia',
    lastName: 'Keys',
    phoneNumber: '515-489-4608',
  },
];

const sortContacts = (contacts) => contacts.slice().sort((contactA, contactB) => {
  if (contactA.lastName < contactB.lastName) return -1;
  if (contactA.lastName > contactB.lastName) return 1;
  if (contactA.firstName < contactB.firstName) return -1;
  if (contactA.firstName > contactB.firstName) return 1;
  return 0;
});

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/', (_req, res) => {
  res.redirect('/contacts');
});

app.get('/contacts', (_req, res) => {
  res.render('contacts', {
    contacts: sortContacts(contactData),
  });
});

app.listen(3000, 'localhost', () => {
  console.log('Listening to port 3000.');
});
