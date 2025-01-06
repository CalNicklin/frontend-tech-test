import { describe, expect, it } from 'vitest';
import mockReport from '../../e2etests/mocks/credit-response.json' assert { type: 'json' };
import { type CreditReport } from '../types';
import { determineStatus } from './index';

describe('determineStatus', () => {
  describe('Public info', () => {
    describe('If there is any information within the personal.publicInfo.courtAndInsolvencies[] array, they have CCJ or insolvency.', () => {
      it('If the user has any CCJ or insolvencies, then they are considered to be off track.', () => {
        const status = determineStatus('public_info', mockReport);
        expect(status).toBe('off_track');
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
        } satisfies CreditReport;
        const status = determineStatus('public_info', report);
        expect(status).toBe('on_track');
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
                utilization: 50,
                limit: {
                  ...mockReport.accounts[0].overview.limit,
                  amount: 6500,
                  currency: 'GBP',
                },
              },
            },
          ],
        } satisfies CreditReport;
        const status = determineStatus('credit_usage', report);
        expect(status).toBe('off_track');
      });

      it('If the user has no credit card balance 50% or more of their limit, they are considered on track', () => {
        const status = determineStatus('credit_usage', mockReport);
        expect(status).toBe('on_track');
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
      } satisfies CreditReport;
      const status = determineStatus('electoral_roll', report);
      expect(status).toBe('off_track');
    });

    it('If the user is on the electoral roll, they are considered to be on track', () => {
      const status = determineStatus('electoral_roll', mockReport);
      expect(status).toBe('on_track');
    });
  });

  it('For unknown categories, returns off track by default', () => {
    const status = determineStatus('unknown_category', mockReport);
    expect(status).toBe('off_track');
  });
});
