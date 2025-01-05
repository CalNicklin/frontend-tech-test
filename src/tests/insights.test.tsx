import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InsightsContainer } from '@client/components/insight-container';
import mockReport from './mocks/credit-response.json';
import { test } from '@playwright/test';

describe('InsightsContainer', () => {
  describe('Status determination', () => {
    describe('Public info', () => {
      it('should show correct status for public information card', async () => {
        // Off track case
        render(<InsightsContainer data={mockReport} />);
        expect(screen.getByTestId('public-info-card')).toMatchSnapshot();
        expect(screen.getByText('Public information')).toBeInTheDocument();
        expect(screen.getByText('Off track')).toBeInTheDocument();
        expect(screen.getByText('High impact')).toBeInTheDocument();
        
        // On track case
        const cleanReport = {
          ...mockReport,
          personal: {
            ...mockReport.personal,
            publicInfo: {
              ...mockReport.personal.publicInfo,
              courtAndInsolvencies: [],
            },
          },
        };
        
        render(<InsightsContainer data={cleanReport} />);
        expect(screen.getByText('On track')).toBeInTheDocument();
      });
    });

    describe('Credit utilisation', () => {
      it('should show correct status for credit utilisation', async () => {
        // Off track case (≥50% utilisation)
        const highUtilReport = {
          ...mockReport,
          accounts: [{
            accountCategory: 'credit_cards',
            overview: {
              balance: { amount: 3250 },
              limit: { amount: 6500 }
            }
          }]
        };

        render(<InsightsContainer data={highUtilReport} />);
        expect(screen.getByTestId('credit-util-card')).toMatchSnapshot();
        expect(screen.getByText('Credit utilisation')).toBeInTheDocument();
        expect(screen.getByText('Off track')).toBeInTheDocument();
        expect(screen.getByText('Medium impact')).toBeInTheDocument();
      });
    });

    describe('Electoral roll', () => {
      it('should show correct status for electoral roll', async () => {
        // Off track case
        const notRegisteredReport = {
          ...mockReport,
          personal: {
            ...mockReport.personal,
            electoralRoll: [{ current: false }]
          }
        };

        render(<InsightsContainer data={notRegisteredReport} />);
        expect(screen.getByTestId('electoral-roll-card')).toMatchSnapshot();
        expect(screen.getByText('Electoral roll')).toBeInTheDocument();
        expect(screen.getByText('Off track')).toBeInTheDocument();
        expect(screen.getByText('Medium impact')).toBeInTheDocument();
      });
    });
  });
});

// Playwright visual regression tests
test.describe('InsightsContainer Visual Tests', () => {
  test('should match screenshot for all states', async ({ page }) => {
    await page.goto('/insights');
    
    // Take screenshots for different states
    await expect(page.getByTestId('public-info-card')).toHaveScreenshot('public-info.png');
    await expect(page.getByTestId('credit-util-card')).toHaveScreenshot('credit-util.png');
    await expect(page.getByTestId('electoral-roll-card')).toHaveScreenshot('electoral-roll.png');
  });
});
