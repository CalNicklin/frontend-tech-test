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

  // TODO: handle loading and error states

  return (
    <main className="flex flex-col p-L gap-y-M max-w-screen-XL mx-auto">
      <Text
        type="h2"
        colour="brand1-step0"
        variant="strong"
        fontSize="L"
        data-testid="feature-heading"
      >
        Insights
      </Text>
      <InsightsContainer data={data} />
    </main>
  );
}

// WRITE TESTS TO CHECK EVERYTHING SETOUT IN README
// ACCESSIBILITY CHECK
// We are zod parsing an entire credit report, should we actuallly handle zod parsing just the insight data on a per card basis?
// We can still render each card as there is statuc content, we jsut need to handle the error state for missing information.
// Check semantic html for cards and text.
