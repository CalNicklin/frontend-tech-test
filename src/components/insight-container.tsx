import { type CreditReport } from '@/types/types';
import { INSIGHTS } from '@/consts';
import { Text } from '@/components/ui/text';
import { cn } from './lib/utils';
import { ParsedInsightCard } from './parsed-insight-container';
import { LoadingSpinner } from './ui/loading-spinner';

interface InsightsContainerProps {
  data: CreditReport | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function InsightsContainer({
  data,
  isLoading,
  isError,
}: InsightsContainerProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center h-full">
        <Text type="p" colour="brand1-step0" variant="strong" fontSize="L">
          An error occurred while loading your credit report
        </Text>
      </div>
    );
  }

  return (
    <section
      aria-label="Credit report insights"
      className="w-full space-y-L"
      data-testid="insights-container"
    >
      <div className="relative L:px-L">
        <div className="flex gap-S L:gap-M overflow-x-auto pb-L pt-S L:grid L:grid-cols-2 XL:grid-cols-3 L:overflow-visible L:grid-rows-[repeat(2,minmax(0,1fr))] L:max-w-screen-XL L:mx-auto">
          {Object.values(INSIGHTS).map((insight, index, array) => (
            <div
              key={String(insight.title)}
              className={cn(
                'min-w-[9.375rem] S:min-w-[calc(50%-theme(spacing.M)*2)]',
                'L:w-full L:min-w-0 L:first:ml-0 L:h-full',
                index === 0 ? 'ml-L' : '',
                index === array.length - 1 ? 'mr-L' : '',
              )}
            >
              <ParsedInsightCard
                key={insight.id}
                data={data}
                insight={insight}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
