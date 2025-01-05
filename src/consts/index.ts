import { ImpactLevels } from '@/shared/types';

export const INSIGHTS = {
  electoralRoll: {
    id: 'electoral-roll',
    category: 'electoral_roll',
    title: 'Electoral roll',
    description: 'Being on the electoral roll can improve your score',
    impact: ImpactLevels.Medium,
  },
  publicInfo: {
    id: 'public-information',
    category: 'public_info',
    title: 'Public information',
    description:
      'Bankruptcies and individual voluntary arrangements can damage your score',
    impact: ImpactLevels.High,
  },
  creditUtilisation: {
    id: 'credit-utilisation',
    category: 'credit_usage',
    title: 'Credit utilisation',
    description:
      'Using more than 50% of your available credit can damage your score',
    impact: ImpactLevels.Medium,
  },
} as const;
