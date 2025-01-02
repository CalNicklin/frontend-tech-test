import type { CreditReport, SduiSchema } from '@shared/types';
import { Z } from 'vitest/dist/chunks/reporters.D7Jzd9GS.js';

export class SDUIService {
  // Simulating CMS-defined content structure
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

  public generateSchema(report: CreditReport): SduiSchema {
    return {
      type: 'screen',
      title: 'Credit Report',
      description: 'Your credit report',
      insights: this.insightStructure.map(insight => ({
        ...insight,
        data: {
          status: this.determineStatus(insight.category, report),
          impact: insight.impact,
          title: insight.title,
          description: insight.description
        }
      }))
    };
  }

  private determineStatus(category: string, report: CreditReport): 'positive' | 'negative' {
    switch (category) {
      case 'public_info':
        return report.personal.publicInfo.courtAndInsolvencies.length === 0
          ? 'positive'
          : 'negative';

      case 'credit_usage':
        const hasHighUtilisation = report.accounts
          .filter(acc => acc.accountCategory === 'credit_cards')
          .some(card => {
            const utilisation = card.overview.balance.amount / card.overview.limit.amount;
            return utilisation >= 0.5;
          });
        return hasHighUtilisation ? 'negative' : 'positive';

      case 'electoral_roll':
        return report.personal.electoralRoll.some(r => r.current)
          ? 'positive'
          : 'negative';

      default:
        return 'negative';
    }
  }
}

export const sduiService = new SDUIService();