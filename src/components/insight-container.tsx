import { type CreditReport, ImpactLevels, Statuses } from '@shared/types';
import { InsightCard } from './insight-card';

const INSIGHTS = [
  {
    id: 'electoral-roll',
    category: 'electoral_roll',
    title: 'Electoral roll',
    description: 'Being on the electoral roll can improve your score',
    impact: ImpactLevels.Medium,
  },
  {
    id: 'public-information',
    category: 'public_info',
    title: 'Public information',
    description:
      'Bankruptcies and individual voluntary arrangements can damage your score',
    impact: ImpactLevels.High,
  },
  {
    id: 'credit-utilisation',
    category: 'credit_usage',
    title: 'Credit utilisation',
    description:
      'Using more than 50% of your available credit can damage your score',
    impact: ImpactLevels.Medium,
  },
] as const;

interface InsightsContainerProps {
  data: CreditReport['record'];
}

function determineStatus(
  category: string,
  report: CreditReport['record'],
): Statuses {
  switch (category) {
    case 'public_info':
      return report.personal.publicInfo.courtAndInsolvencies.length === 0
        ? Statuses.OnTrack
        : Statuses.OffTrack;

    case 'credit_usage': {
      const hasHighUtilisation = report.accounts
        .filter((acc) => acc.accountCategory === 'credit_cards')
        .some((card) => {
          if ('limit' in card.overview) {
            const utilisation =
              card.overview.balance.amount / card.overview.limit.amount;
            return utilisation >= 0.5;
          }
          return false;
        });
      return hasHighUtilisation ? Statuses.OffTrack : Statuses.OnTrack;
    }

    case 'electoral_roll':
      return report.personal.electoralRoll.some((r) => r.current)
        ? Statuses.OnTrack
        : Statuses.OffTrack;

    default:
      return Statuses.OffTrack;
  }
}

export function InsightsContainer({ data }: InsightsContainerProps) {
  return (
    <div className="w-full space-y-6">
      <div className="relative -mx-6 px-6 S:-mx-8 S:px-8 L:mx-0 L:px-0">
        <div className="flex gap-4 overflow-x-auto pb-6 L:grid L:grid-cols-2 XL:grid-cols-3 L:overflow-visible">
          {INSIGHTS.map((insight) => (
            <div
              key={String(insight.title)}
              className="min-w-[calc(50%-2rem)] S:min-w-[calc(50%-2rem)] L:min-w-0 L:first:ml-0"
            >
              <InsightCard
                key={insight.id}
                heading={insight.title}
                body={insight.description}
                impact={insight.impact}
                status={determineStatus(insight.category, data)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
