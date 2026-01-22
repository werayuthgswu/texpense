const express = require('express');
const path = require('path');
const expenseController = require('./controllers/expenseController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', expenseController.index);
app.post('/add', expenseController.add);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
