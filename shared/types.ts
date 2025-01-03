import type { z } from 'zod';
import type { CardElement, CreditReportSchema, SDUISchema } from './schemas';

export type CreditReport = z.infer<typeof CreditReportSchema>;

export type SDUISchema = z.infer<typeof SDUISchema>;

export type CardElement = z.infer<typeof CardElement>;

export enum Statuses {
  OnTrack = 'on_track',
  OffTrack = 'off_track',
}

export enum ImpactLevels {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}
