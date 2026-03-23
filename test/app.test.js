const request = require('supertest');
const express = require('express');
const path = require('path');
const expenseController = require('../controllers/expenseController');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.get('/', expenseController.index);
app.post('/add', expenseController.add);

describe('Expense Tracker API', () => {
  test('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('POST /add should handle expense creation', async () => {
    const res = await request(app)
      .post('/add')
      .send({ description: 'Test expense', amount: '50' });
    expect(res.statusCode).toBe(302);
  });
});
