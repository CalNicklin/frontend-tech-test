import { env } from '@/env';
import type { CreditReport, InsightsReport } from '../types/types';
import { InsightsReportSchema } from '../types/schemas';

/**
 * A typesafe API client for the credit report and insights report.
 * The credit report data is returned without schema validation to allow components
 * to validate their specific needs, while the insights report uses zod for full validation.
 * This approach allows for granular error handling at the component level for credit report data.
 */
export const api = {
  fetchCreditReport: async () => {
    const response = await fetch(env.CREDIT_REPORT_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${String(response.status)}`);
    }
    const json = (await response.json()) as CreditReport;
    return json;
  },

  fetchInsights: async () => {
    const response = await fetch(env.INSIGHTS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${String(response.status)}`);
    }
    const json = (await response.json()) as InsightsReport;
    const parsed = InsightsReportSchema.parse(json);
    return parsed;
  },
};
