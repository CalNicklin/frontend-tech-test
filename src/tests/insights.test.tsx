import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import mockReport from '@server/src/services/mocks/credit-response.json';
import { InsightsContainer } from '@client/components/insight-container';

describe('InsightsContainer', () => {
  describe('Status determination', () => {
    describe('Public info', () => {
      describe('If there is any information within the personal.publicInfo.courtAndInsolvencies[] array, they have CCJ or insolvency.', () => {
        it('If the user has any CCJ or insolvencies, then they are considered to be off track.', () => {
          render(<InsightsContainer data={mockReport} />);

          const publicInfoCard = screen
            .getByText('Public information')
            .closest('[data-testid="insight-card"]');
          const status = publicInfoCard?.querySelector(
            '[data-testid="status"]',
          );

          expect(status).toHaveTextContent('Off track');
        });

        it('If the user has no CCJ or insolvencies, then they are considered to be on track.', () => {
          const report = {
            ...mockReport,
            personal: {
              ...mockReport.personal,
              publicInfo: {
                ...mockReport.personal.publicInfo,
                courtAndInsolvencies: [],
              },
            },
          };

          render(<InsightsContainer data={report} />);

          const publicInfoCard = screen
            .getByText('Public information')
            .closest('[data-testid="insight-card"]');
          const status = publicInfoCard?.querySelector(
            '[data-testid="status"]',
          );

          expect(status).toHaveTextContent('On track');
        });
      });
    });

    describe('Credit utilisation', () => {
      describe('An account it considered to be a credit card when accounts[].accountCategory is credit_cards', () => {
        it('If the user has any credit card balance 50% or more of their limit, they are considered off track', () => {
          const report = {
            ...mockReport,
            accounts: [
              ...mockReport.accounts,
              {
                ...mockReport.accounts[0],
                accountCategory: 'credit_cards',
                overview: {
                  ...mockReport.accounts[0].overview,
                  balance: {
                    ...mockReport.accounts[0].overview.balance,
                    amount: 3250,
                  },
                  limit: {
                    ...mockReport.accounts[0].overview.limit,
                    amount: 6500,
                  },
                },
              },
            ],
          };

          render(<InsightsContainer data={report} />);

          const creditUtilisationCard = screen
            .getByText('Credit utilisation')
            .closest('[data-testid="insight-card"]');
          const status = creditUtilisationCard?.querySelector(
            '[data-testid="status"]',
          );

          expect(status).toHaveTextContent('Off track');
        });

        it('If the user has no credit card balance 50% or more of their limit, they are considered on track', () => {
          render(<InsightsContainer data={mockReport} />);

          const creditUtilisationCard = screen
            .getByText('Credit utilisation')
            .closest('[data-testid="insight-card"]');
          const status = creditUtilisationCard?.querySelector(
            '[data-testid="status"]',
          );

          expect(status).toHaveTextContent('On track');
        });
      });
    });

    describe('Electoral roll', () => {
      it('If the user is not on an electoral roll, they are considered to be off track', () => {
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
        };

        render(<InsightsContainer data={report} />);

        const electoralRollCard = screen
          .getByText('Electoral roll')
          .closest('[data-testid="insight-card"]');
        const status = electoralRollCard?.querySelector(
          '[data-testid="status"]',
        );

        expect(status).toHaveTextContent('Off track');
      });

      it('If the user is on the electoral roll, they are considered to be on track', () => {
        render(<InsightsContainer data={mockReport} />);

        const electoralRollCard = screen
          .getByText('Electoral roll')
          .closest('[data-testid="insight-card"]');
        const status = electoralRollCard?.querySelector(
          '[data-testid="status"]',
        );

        expect(status).toHaveTextContent('On track');
      });
    });
  });
});
