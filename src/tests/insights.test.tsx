import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InsightsContainer } from '@client/components/insight-container';
import mockReport from './mocks/credit-response.json';

describe('InsightsContainer', () => {
  describe('Status determination', () => {
    describe('Public info', () => {
      describe('If there is any information within the personal.publicInfo.courtAndInsolvencies[] array, they have CCJ or insolvency.', () => {
        it.todo('Header is Public information');
        it.todo('Impact is High');
        it.todo(
          'Body is Bankruptcies and individual voluntary arrangements can damage your score',
        );

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
        it.todo('Header is Credit utilisation');
        it.todo('Impact is Medium');
        it.todo(
          'Body is Using more than 50% of your available credit can damage your score',
        );

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
      it.todo('Header is Electoral roll');
      it.todo('Impact is Medium');
      it.todo('Body is Being on the electoral roll can improve your score');

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
