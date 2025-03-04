import { test, expect } from '@playwright/test';
import { INSIGHTS } from '@/consts';
import { type CreditReport } from '@/types/types';
import { env } from '../src/env';
import mockReport from './mocks/credit-response.json' assert { type: 'json' };
import mockInsightsReport from './mocks/insight-response.json' assert { type: 'json' };

/**
 * I started my test approach with this high level integration test. I was concerned about timing and figured that this would yield
 * the most complete test coverage in a short amount of time.
 * 
 * Since then I've added some core functionality unit tests and some contract tests.
 * 
 * A limitation of this test suite is that I'm not checking for actually component style values, but I am doing a screenshot comparison.
 * Also, given the time constraints I haven't added full sad-path testing e.g. error states.
 */

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

  test('electoral roll drawer interaction for an on track insight', async ({
    page,
  }) => {
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

    const drawer = page.getByRole('dialog');
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText('The electoral roll');
    await expect(drawer).toContainText(mockInsightsReport.onTrackDescription);
    await expect(drawer).toContainText('ON TRACK');

    await page.getByRole('button', { name: 'close' }).click();
    await expect(drawer).not.toBeVisible();
  });

  test('electoral role drawer interaction for an off track insight', async ({
    page,
  }) => {
    // Off track data
    const report = {
      ...mockReport,
      personal: {
        ...mockReport.personal,
        electoralRoll: [
          {
            ...mockReport.personal.electoralRoll[0],
            current: false,
          },
        ],
      },
    } satisfies CreditReport;

    await page.route(env.CREDIT_REPORT_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(report),
      });
    });

    await page.route(env.INSIGHTS_API_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockInsightsReport),
      });
    });

    // Reload the page to start fresh with our mocked data
    await page.reload();
    await page.waitForLoadState('networkidle');

    const card = page
      .getByRole('article')
      .filter({ hasText: INSIGHTS.electoralRoll.title });

    await expect(card.getByTestId('on-track-tag')).toHaveText('OFF TRACK');

    await card.click();

    // Wait for loading to end
    await page.waitForSelector('text="Loading insight details"', {
      state: 'detached',
    });
    await page.waitForLoadState('networkidle');

    const drawer = page.getByRole('dialog');
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText('The electoral roll');
    await expect(drawer).toContainText('OFF TRACK');
    await expect(drawer).toContainText(mockInsightsReport.offTrackDescription);

    await page.getByRole('button', { name: 'close' }).click();
    await expect(drawer).not.toBeVisible();
  });
});
