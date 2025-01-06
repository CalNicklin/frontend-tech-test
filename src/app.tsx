import { useQuery } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';
import { Text } from './components/ui/text';
import { InsightsContainer } from './components/insight-container';
import { api } from './api/api';

export function App() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['credit'],
    queryFn: api.fetchCreditReport,
  });

  if (error) {
    Sentry.captureException(error);
  }

  return (
    <main className="flex flex-col gap-y-M w-full">
      <div className="px-L">
        <div className="max-w-screen-XL mx-auto w-full">
          <Text
            type="h2"
            colour="brand1-step0"
            variant="strong"
            fontSize="L"
            data-testid="feature-heading"
          >
            Insights
          </Text>
        </div>
      </div>
      <div className="w-full overflow-visible">
        <InsightsContainer
          data={data}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </main>
  );
}

// JOURNAL
// Check fonts against broswer inspertor
