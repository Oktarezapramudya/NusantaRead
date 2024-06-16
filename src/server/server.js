const express = require('express');
const { saveBooks, getSavedBooks } = require('../handlers/bookHandler');
const { register, login } = require('../handlers/userHandler');
const { saveActivity } = require('../handlers/activityHandler');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/register', register);
app.post('/login', login);
app.post('/save-books', saveBooks);
app.get('/saved-books', getSavedBooks);
app.post('/save-activity', saveActivity);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
