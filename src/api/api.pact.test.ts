import { describe, it, expect } from 'vitest';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { env } from '@client/env';
import mockReport from '@/e2etests/mocks/credit-response.json';
import { api } from './api';

const provider = new PactV3({
  consumer: 'CreditInsightsWeb',
  provider: 'ThirdPartyAPI',
});

describe('Credit Insights API', () => {
  describe('fetchCreditReport', () => {
    it('returns a valid credit report', async () => {
      provider.addInteraction({
        states: [{ description: 'credit report exists' }],
        uponReceiving: 'a request for credit report',
        withRequest: {
          method: 'GET',
          path: '/',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: mockReport,
        },
      });

      await provider.executeTest(async (mockserver) => {
        const tempUrl = mockserver.url;
        const originalUrl = env.CREDIT_REPORT_API_URL;

        env.CREDIT_REPORT_API_URL = tempUrl;

        try {
          const response = await api.fetchCreditReport();
          expect(response).toBeDefined();
          expect(response.accounts).toBeDefined();
          expect(Array.isArray(response.accounts)).toBe(true);
          expect(response.personal).toBeDefined();
        } finally {
          env.CREDIT_REPORT_API_URL = originalUrl;
        }
      });
    });
  });

  describe('fetchInsights', () => {
    it('returns insights successfully', async () => {
      const originalUrl = new URL(env.INSIGHTS_API_URL);

      provider.addInteraction({
        states: [{ description: 'insights exist' }],
        uponReceiving: 'a request for insights',
        withRequest: {
          method: 'GET',
          path: originalUrl.pathname || '/',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: MatchersV3.like({
            title: MatchersV3.string('Credit Insights'),
            onTrackDescription: MatchersV3.string('You are on track'),
            offTrackDescription: MatchersV3.string('You are off track'),
            details: MatchersV3.eachLike(
              {
                title: MatchersV3.string('Detail Title'),
                description: MatchersV3.string('Detail Description'),
              },
              2,
            ),
          }),
        },
      });

      await provider.executeTest(async (mockserver) => {
        const mockUrl = new URL(originalUrl.pathname, mockserver.url);
        const tempUrl = mockUrl.toString();

        env.INSIGHTS_API_URL = tempUrl;

        try {
          const response = await api.fetchInsights();
          expect(response).toBeDefined();
          expect(response.title).toBeDefined();
          expect(response.details).toHaveLength(2);
        } finally {
          env.INSIGHTS_API_URL = originalUrl.toString();
        }
      });
    });
  });
});
