import { type CreditReport } from '@shared/types';
import { INSIGHTS } from '@/src/consts';
import { determineStatus } from '@/src/lib';
import { InsightCard } from './insight-card';

interface InsightsContainerProps {
  data: CreditReport['record'];
}

export function InsightsContainer({ data }: InsightsContainerProps) {
  return (
    <section
      aria-label="Credit report insights"
      className="w-full space-y-L"
      data-testid="insights-container"
    >
      <div className="relative -mx-L px-L S:-mx-[2rem] S:px-[2rem] L:mx-0 L:px-0">
        <div className="flex gap-M overflow-x-auto pb-L L:grid L:grid-cols-2 XL:grid-cols-3 L:overflow-visible">
          {Object.values(INSIGHTS).map((insight) => (
            <div
              key={String(insight.title)}
              className="min-w-[calc(50%-theme(spacing.M))] S:min-w-[calc(50%-theme(spacing.M))] L:min-w-0 L:first:ml-0"
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
    </section>
  );
}
