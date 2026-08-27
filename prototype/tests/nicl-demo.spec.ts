import { expect, test } from '@playwright/test';

test('NICL presentation path works end-to-end', async ({ page }) => {
  await page.goto('/nicl-demo');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Insurance information');
  await expect(page.getByText('INTERACTIVE CONCEPT DEMO')).toBeVisible();

  await page.getByRole('button', { name: /Insurance/ }).first().click();
  await expect(page.getByText('Find what you need without navigating a maze.')).toBeVisible();
  await page.keyboard.press('Escape');

  await page.locator('#procurement').scrollIntoViewIfNeeded();
  await expect(page.getByText('Mock API connected')).toBeVisible();
  await expect(page.getByText('Procurement opportunities')).toBeVisible();
  await expect(page.locator('article').filter({ hasText: 'illustrative record' }).first()).toBeVisible();

  await page.locator('#ai-assistant').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Show current tenders' }).click();
  await expect(page.getByText(/Procurement & Tender Centre lets users search structured tender records/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Procurement & Tender Centre/ })).toBeVisible();

  await page.getByRole('button', { name: /Open CMS workflow demo/ }).click();
  await expect(page.getByText('Governed publishing')).toBeVisible();
  await expect(page.getByText('Content Author')).toBeVisible();
  await expect(page.getByText('Authorized Approver')).toBeVisible();
  await page.keyboard.press('Escape');

  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(page.getByText('DEMO — NOT A LIVE NICL WEBSITE')).toBeVisible();
});

test('NICL demo remains usable at presentation-laptop size', async ({ page }) => {
  await page.goto('/nicl-demo');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await page.locator('#services').scrollIntoViewIfNeeded();
  await expect(page.getByText('How can NICL help you today?')).toBeVisible();
  await page.locator('#insurance').scrollIntoViewIfNeeded();
  await expect(page.getByText('Marine Insurance', { exact: true }).first()).toBeVisible();
});
