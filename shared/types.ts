import type { z } from 'zod';
import type { CreditReportSchema, SDUISchema } from './schemas';

export type CreditReport = z.infer<typeof CreditReportSchema>;

export type SDUISchema = z.infer<typeof SDUISchema>;
