import { type z } from 'zod';
import { type Status } from '@/shared/schemas';
import type { CreditReport, SDUISchema } from '@shared/types';

export class SDUIService {
  // Represents a CMS-defined content structure, I assume this is how Clearscore defines content ordering etc

  private readonly insightStructure = [
    {
      id: 'public-information',
      type: 'insightCard',
      category: 'public_info',
      title: 'Public information',
      description: 'Bankruptcies and individual voluntary arrangements can damage your score',
      impact: 'high' as const
    },
    {
      id: 'credit-utilisation',
      type: 'insightCard',
      category: 'credit_usage',
      title: 'Credit utilisation',
      description: 'Using more than 50% of your available credit can damage your score',
      impact: 'medium' as const
    },
    {
      id: 'electoral-roll',
      type: 'insightCard',
      category: 'electoral_roll',
      title: 'Electoral roll',
      description: 'Being on the electoral roll can improve your score',
      impact: 'medium' as const
    }
  ] as const;

  public generateSchema(report: CreditReport): SDUISchema {
    return {
      type: 'screen',
      elements: this.insightStructure.map(insight => ({
        id: insight.id,
        type: 'insightCard',
        category: insight.category,
        elements: [
          { type: 'status', value: this.determineStatus(insight.category, report) },
          { type: 'heading', text: insight.title },
          { type: 'body', text: insight.description },
          { type: 'impact', level: insight.impact },
        ],
        actions: {
          onClick: { type: 'drawer', data: { report } }
        }
      }))
    };
  }

  private determineStatus(category: string, report: CreditReport): z.infer<typeof Status>['value'] {
    switch (category) {
      case 'public_info':
        return report.personal.publicInfo.courtAndInsolvencies.length === 0
          ? 'on_track'
          : 'off_track';

      case 'credit_usage': {
        const hasHighUtilisation = report.accounts
          .filter(acc => acc.accountCategory === 'credit_cards')
          .some(card => {
            if ('limit' in card.overview) {
              const utilisation = card.overview.balance.amount / card.overview.limit.amount;
              return utilisation >= 0.5;
            }
            return false;
          });
        return hasHighUtilisation ? 'off_track' : 'on_track';
      }

      case 'electoral_roll':
        return report.personal.electoralRoll.some(r => r.current)
          ? 'on_track'
          : 'off_track';

      default:
        return 'off_track';
    }
  }
}

export const sduiService = new SDUIService();