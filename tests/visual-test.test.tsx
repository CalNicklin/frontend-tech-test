import { test, expect } from '@playwright/test';
import { INSIGHTS } from '@/src/consts';
import { env } from '../src/env';
import mockReport from './mocks/credit-response.json' assert { type: 'json' };
import mockInsightsReport from './mocks/insight-response.json' assert { type: 'json' };

test.describe('Credit Report Insights', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await page.route(env.CREDIT_REPORT_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockReport),
      });
    });

    await page.waitForLoadState('networkidle');

    await expect(
      page.getByTestId('feature-heading'),
      'Feature heading should be present and contain Insights',
    ).toHaveText('Insights', { timeout: 10000 });
  });

  test.describe('displays correct insight statuses and impact tags based on credit report', () => {
    test('Public Info Card', async ({ page }) => {
      await page.waitForSelector('[data-testid="insights-container"]');

      const publicInfoCard = page
        .getByRole('article')
        .filter({ hasText: INSIGHTS.publicInfo.title });

      await page.screenshot({
        path: 'screenshots/test-results/test-public-info-card.png',
      });

      await expect(
        publicInfoCard.getByTestId('on-track-tag'),
        'On track tag should be present and contain OFF TRACK',
      ).toHaveText('OFF TRACK', { timeout: 10000 });

      await expect(
        publicInfoCard.getByTestId('insight-heading'),
        `Insight heading should be present and contain ${INSIGHTS.publicInfo.title}`,
      ).toHaveText(INSIGHTS.publicInfo.title, { timeout: 10000 });

      await expect(
        publicInfoCard.getByTestId('insight-body'),
        `Insight body should be present and contain ${INSIGHTS.publicInfo.description}`,
      ).toHaveText(INSIGHTS.publicInfo.description, { timeout: 10000 });

      const impactTag = publicInfoCard.getByTestId('impact-tag').first();

      await expect(
        impactTag,
        'Impact tag should be present and be uppercase HIGH IMPACT',
      ).toHaveText('HIGH IMPACT', { timeout: 10000 });
    });

    test('Electoral Roll Card', async ({ page }) => {
      await page.waitForSelector('[data-testid="insights-container"]');

      const electoralRollCard = page
        .getByRole('article')
        .filter({ hasText: INSIGHTS.electoralRoll.title });

      await page.screenshot({
        path: 'screenshots/test-results/test-electoral-roll-card.png',
      });

      await expect(
        electoralRollCard.getByTestId('insight-heading'),
        `Insight heading should be present and contain ${INSIGHTS.electoralRoll.title}`,
      ).toHaveText(INSIGHTS.electoralRoll.title, { timeout: 10000 });

      await expect(
        electoralRollCard.getByTestId('insight-body'),
        `Insight body should be present and contain ${INSIGHTS.electoralRoll.description}`,
      ).toHaveText(INSIGHTS.electoralRoll.description, { timeout: 10000 });

      await expect(
        electoralRollCard.getByTestId('on-track-tag'),
        'On track tag should be present and contain ON TRACK',
      ).toHaveText('ON TRACK', { timeout: 10000 });

      const impactTag = electoralRollCard.getByTestId('impact-tag').first();
      await expect(
        impactTag,
        'Impact tag should be present and contain MEDIUM IMPACT',
      ).toHaveText('MEDIUM IMPACT', { timeout: 10000 });
    });

    test('Credit Score Card', async ({ page }) => {
      await page.waitForSelector('[data-testid="insights-container"]');

      const creditScoreCard = page
        .getByRole('article')
        .filter({ hasText: INSIGHTS.creditUtilisation.title });

      await page.screenshot({
        path: 'screenshots/test-results/test-credit-score-card.png',
      });

      await expect(
        creditScoreCard.getByTestId('insight-heading'),
        `Insight heading should be present and contain ${INSIGHTS.creditUtilisation.title}`,
      ).toHaveText(INSIGHTS.creditUtilisation.title, { timeout: 10000 });

      await expect(
        creditScoreCard.getByTestId('on-track-tag'),
        'On track tag should be present and contain ON TRACK',
      ).toHaveText('ON TRACK', { timeout: 10000 });

      const impactTag = creditScoreCard.getByTestId('impact-tag').first();
      await expect(
        impactTag,
        'Impact tag should be present and contain MEDIUM IMPACT',
      ).toHaveText('MEDIUM IMPACT', { timeout: 10000 });
    });
  });

  test('responsive layout works correctly', async ({ page }) => {
    // Mobile view - horizontal scroll
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.getByTestId('insights-container')).toHaveScreenshot(
      'responsive/small.png',
    );

    // Tablet view
    await page.setViewportSize({ width: 768, height: 800 });
    await expect(page.getByTestId('insights-container')).toHaveScreenshot(
      'responsive/medium.png',
    );

    // Desktop view - grid layout
    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(page.getByTestId('insights-container')).toHaveScreenshot(
      'responsive/large.png',
    );

    // XL view
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.getByTestId('insights-container')).toHaveScreenshot(
      'responsive/xl.png',
    );
  });

  test('electoral roll drawer interaction', async ({ page }) => {
    // Click electoral roll card
    await page
      .getByRole('article')
      .filter({ hasText: INSIGHTS.electoralRoll.title })
      .click();

    await page.route(env.INSIGHTS_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockInsightsReport),
      });
    });

    await page.waitForLoadState('networkidle');

    // Check drawer appears with correct content
    const drawer = page.getByRole('dialog');
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText('The electoral roll');

    // Check drawer can be closed
    await page.getByRole('button', { name: 'close' }).click();
    await expect(drawer).not.toBeVisible();
  });
});
