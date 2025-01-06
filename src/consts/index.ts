import { ImpactLevels } from '@/types/types';
import {
  CreditUsageInsightSchema,
  ElectoralRollInsightSchema,
  PublicInfoInsightSchema,
} from '../types/schemas';

/**
 * A list of insights that will be displayed in the insights container.
 * In reality, this would be fetched from the server, and most likely the entire app would be SDui, 
 * so this schema would be far extended to include styling etc.
 */
export const INSIGHTS = {
  electoralRoll: {
    id: 'electoral-roll',
    category: 'electoral_roll',
    title: 'Electoral roll',
    description: 'Being on the electoral roll can improve your score',
    impact: ImpactLevels.Medium,
    schema: ElectoralRollInsightSchema,
    action: true,
  },
  publicInfo: {
    id: 'public-information',
    category: 'public_info',
    title: 'Public information',
    description:
      'Bankruptcies and individual voluntary arrangements can damage your score',
    impact: ImpactLevels.High,
    schema: PublicInfoInsightSchema,
    action: false,
  },
  creditUtilisation: {
    id: 'credit-utilisation',
    category: 'credit_usage',
    title: 'Credit utilisation',
    description:
      'Using more than 50% of your available credit can damage your score',
    impact: ImpactLevels.Medium,
    schema: CreditUsageInsightSchema,
    action: false,
  },
} as const;
