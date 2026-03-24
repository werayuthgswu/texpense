const { test, expect } = require('@playwright/test');

test('expense tracker title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await expect(page).toHaveTitle('Expense tracker');
});

test('expense tracker value', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await expect(page.locator('text=0.00')).toBeVisible();
});

test('expense tracker button', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await expect(page.locator('button', { hasText: 'Add entry' })).toBeVisible();
});


test('add income and expense entry', async ({ page }) => {
  await page.goto('http://localhost:3000');

  let income = '100';
  let expense = '20';
  let expectedValue = '80';
  
  await page.fill('input[placeholder*="income"], input[name*="income"]', income);
  await page.fill('input[placeholder*="expense"], input[name*="expense"]', expense);
  await page.fill('textarea[name="detail"]', 'first day');
  await page.click('button:has-text("Add entry")');
  
  const actualText = await page.locator('.sidebar h2').textContent();
  expect(actualText, `Expected "${expectedValue}" but got "${actualText}"`).toBe(expectedValue);
});
