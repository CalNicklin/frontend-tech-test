import * as Sentry from '@sentry/react';
import { type INSIGHTS } from '@/consts';
import { determineStatus } from '@/lib';
import { type CreditReport } from '../types/types';
import { InsightCard } from './insight-card';

interface ParsedInsightCardProps {
  data: CreditReport;
  insight: (typeof INSIGHTS)[keyof typeof INSIGHTS];
}

function getInsightData(
  data: CreditReport,
  insight: (typeof INSIGHTS)[keyof typeof INSIGHTS],
) {
  if (insight.category === 'electoral_roll') {
    return data.personal.electoralRoll;
  }
  if (insight.category === 'public_info') {
    return data.personal.publicInfo.courtAndInsolvencies;
  }
  return data.accounts;
}

/**
 * Takes the data and insight, and validates the credit report data against the schema required for a given insight.
 * This is so we can handle errors gracefully, and display an error state if the data is invalid on a PER CARD basis,
 * rather than failing to parse the entire credit report.
 * If the data is valid, it will display the insight.
 *
 * This is a simple approach, and would be improved in a larger application, something like GraphQL could work well here.
 */
export function ParsedInsightCard({ data, insight }: ParsedInsightCardProps) {
  const validateData = insight.schema.safeParse(getInsightData(data, insight));

  if (!validateData.success) {
    Sentry.captureException(validateData.error, {
      extra: {
        data,
        insight,
      },
    });

    return (
      <InsightCard
        heading={insight.title}
        body={insight.description}
        impact={insight.impact}
        status={undefined}
        drawer={false}
        error
      />
    );
  }

  return (
    <InsightCard
      heading={insight.title}
      body={insight.description}
      impact={insight.impact}
      status={determineStatus(insight.category, data)}
      drawer={insight.action}
    />
  );
}
