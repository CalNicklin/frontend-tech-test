import { type CreditReport, Statuses } from '@/shared/types';

export function determineStatus(
  category: string,
  report: CreditReport,
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
