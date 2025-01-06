import * as Sentry from '@sentry/react';
import { type INSIGHTS } from '@/src/consts';
import { determineStatus } from '@/src/lib';
import { type CreditReport } from '../types';
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
