const { Expense, ExpenseModel } = require('../models/expense');

describe('Expense', () => {
  test('creates expense with all parameters', () => {
    const expense = new Expense('2024-01-01', 1000, 500, 'Test expense');
    expect(expense.date).toBe('2024-01-01');
    expect(expense.income).toBe(1000);
    expect(expense.expense).toBe(500);
    expect(expense.detail).toBe('Test expense');
  });

  test('handles string numbers', () => {
    const expense = new Expense('2024-01-01', '1000.50', '500.25');
    expect(expense.income).toBe(1000.50);
    expect(expense.expense).toBe(500.25);
  });

  test('defaults to 0 for invalid numbers', () => {
    const expense = new Expense('2024-01-01', 'invalid', null);
    expect(expense.income).toBe(0);
    expect(expense.expense).toBe(0);
  });

  test('defaults to empty string for missing detail', () => {
    const expense = new Expense('2024-01-01', 1000, 500);
    expect(expense.detail).toBe('');
  });
});

describe('ExpenseModel', () => {
  let model;

  beforeEach(() => {
    model = new ExpenseModel();
  });

  test('initializes with empty expenses array', () => {
    expect(model.expenses).toEqual([]);
  });

  test('adds expense to array', () => {
    const expense = new Expense('2024-01-01', 1000, 500, 'Test');
    model.add(expense);
    expect(model.expenses).toHaveLength(1);
    expect(model.expenses[0]).toBe(expense);
  });
/*
  test('returns all expenses', () => {
    const expense1 = new Expense('2024-01-01', 1000, 500);
    const expense2 = new Expense('2024-01-02', 2000, 300);
    model.add(expense1);
    model.add(expense2);
    expect(model.getAll()).toEqual([expense1, expense2]);
  });
*/
  test('calculates total income', () => {
    model.add(new Expense('2024-01-01', 1000, 500));
    model.add(new Expense('2024-01-02', 2000, 300));
    expect(model.getTotalIncome()).toBe(3000);
  });

  test('calculates total expense', () => {
    model.add(new Expense('2024-01-01', 1000, 500));
    model.add(new Expense('2024-01-02', 2000, 300));
    expect(model.getTotalExpense()).toBe(800);
  });

  test('calculates money left', () => {
    model.add(new Expense('2024-01-01', 1000, 500));
    model.add(new Expense('2024-01-02', 2000, 300));
    expect(model.getMoneyLeft()).toBe(2200);
  });

  test('handles empty expenses for calculations', () => {
    expect(model.getTotalIncome()).toBe(0);
    expect(model.getTotalExpense()).toBe(0);
    expect(model.getMoneyLeft()).toBe(0);
  });
});
