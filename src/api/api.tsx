import { env } from '@/env';
import type { CreditReport, InsightsReport } from '../types/types';
import { CreditReportSchema, InsightsReportSchema } from '../types/schemas';

/**
 * A typesafe API client for the credit report and insights report.
 * By using zod to parse the data, we get runtime validation of the data, as well as inference of the data type.
 * Threading type safety through the react query client
 */
export const api = {
  fetchCreditReport: async () => {
    const response = await fetch(env.CREDIT_REPORT_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${String(response.status)}`);
    }
    const json = (await response.json()) as CreditReport;
    const parsed = CreditReportSchema.parse(json);
    return parsed;
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
