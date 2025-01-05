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
      <div className="relative L:px-L">
        <div className="flex gap-M overflow-x-auto pb-L L:grid L:grid-cols-2 XL:grid-cols-3 L:overflow-visible L:grid-rows-[repeat(2,minmax(0,1fr))] L:max-w-screen-XL L:mx-auto">
          {Object.values(INSIGHTS).map((insight, index, array) => (
            <div
              key={String(insight.title)}
              className={`min-w-[9.375rem] S:min-w-[calc(50%-theme(spacing.M)*2.5)] 
                L:w-full L:min-w-0 L:first:ml-0 L:h-full
                ${index === 0 ? 'ml-L' : ''} 
                ${index === array.length - 1 ? 'mr-L' : ''}
              `}
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
