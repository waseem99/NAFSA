import { expect, test } from '@playwright/test';

test('NICL presentation path works end-to-end', async ({ page }) => {
  await page.goto('/nicl-demo');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Insurance information');
  await expect(page.getByText('INTERACTIVE CONCEPT DEMO', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: /Insurance/ }).first().click();
  await expect(page.getByText('Find what you need without navigating a maze.', { exact: true })).toBeVisible();
  await page.keyboard.press('Escape');

  await page.locator('#procurement').scrollIntoViewIfNeeded();
  await expect(page.getByText('Mock API connected', { exact: true })).toBeVisible();
  await expect(page.getByText('Procurement opportunities', { exact: true })).toBeVisible();
  await expect(page.locator('article').filter({ hasText: 'illustrative record' }).first()).toBeVisible();

  await page.locator('#ai-assistant').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Show current tenders', exact: true }).click();
  await expect(page.getByText(/Procurement & Tender Centre lets users search structured tender records/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Procurement & Tender Centre/ })).toBeVisible();

  await page.getByRole('button', { name: /Open CMS workflow demo/ }).click();
  const workflow = page.getByRole('dialog', { name: 'CMS workflow demonstration' });
  await expect(workflow).toBeVisible();
  await expect(workflow.getByText('Content Author', { exact: true })).toBeVisible();
  await expect(workflow.getByText('Authorized Approver', { exact: true })).toBeVisible();
  await page.keyboard.press('Escape');

  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(page.getByText('DEMO — NOT A LIVE NICL WEBSITE', { exact: true })).toBeVisible();
});

test('NICL demo remains usable at presentation-laptop size', async ({ page }) => {
  await page.goto('/nicl-demo');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search', exact: true }).first()).toBeVisible();
  await page.locator('#services').scrollIntoViewIfNeeded();
  await expect(page.getByText('How can NICL help you today?', { exact: true })).toBeVisible();
  await page.locator('#insurance').scrollIntoViewIfNeeded();
  await expect(page.getByText('Marine Insurance', { exact: true }).first()).toBeVisible();
});
