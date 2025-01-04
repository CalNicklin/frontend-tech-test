import { type z } from 'zod';
import {
  type CreditReportSchema,
  type InsightsReportSchema,
} from './schemas';

export type CreditReport = z.infer<typeof CreditReportSchema>;
export type InsightsReport = z.infer<typeof InsightsReportSchema>;
