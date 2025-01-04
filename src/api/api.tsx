import { env } from '@client/env';
import type { CreditReport, InsightsReport } from '../types';
import { CreditReportSchema, InsightsReportSchema } from '../schemas';

/**
 * A typesafe API client for the credit report and insights report.
 * By using zod to parse the data, we get runtime validation of the data, as well as inference of the data type.
 * Threading type safety through the react query client
 */
export const api = {
  fetchCreditReport: async () => {
    const response = await fetch(env.CREDIT_REPORT_API_URL);
    const json = (await response.json()) as CreditReport;
    const parsed = CreditReportSchema.parse(json);
    return parsed;
  },

  fetchInsights: async () => {
    const response = await fetch(env.INSIGHTS_API_URL);
    const json = (await response.json()) as InsightsReport;
    const parsed = InsightsReportSchema.parse(json);
    return parsed;
  },
};
