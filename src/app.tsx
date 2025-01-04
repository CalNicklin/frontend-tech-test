import { useQuery } from '@tanstack/react-query';
import { Text } from './components/ui/text';
import { InsightsContainer } from './components/insight-container';
import { api } from './api/api';

export function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['credit'],
    queryFn: api.fetchCreditReport,
  });

  if (!data) return null;

  return (
    <div className="flex flex-col p-L gap-y-M">
      <Text type="h1" colour="brand1-step0" variant="strong" fontSize="L">
        Insights
      </Text>
      <InsightsContainer data={data} />
    </div>
  );
}

// WRITE TESTS TO CHECK EVERYTHING SETOUT IN README
