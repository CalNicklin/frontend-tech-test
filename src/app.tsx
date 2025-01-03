import { useQuery } from '@tanstack/react-query';
import { type CreditReport } from '@shared/types';
import { CreditReportSchema } from '@/shared/schemas';
import { Text } from './components/ui/text';
import { InsightsContainer } from './components/insight-container';
import { env } from './env';

const fetchCreditReport = async () => {
  const response = await fetch(`${env.API_URL}/credit`);
  const json = (await response.json()) as CreditReport;
  const parsed = CreditReportSchema.parse(json);
  return parsed.record;
};

export function App() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['credit'],
    queryFn: fetchCreditReport,
  });

  if (!data) return null;

  return (
    <>
      <Text type="h1" colour="brand1-step0" variant="strong" fontSize="L">
        Insights
      </Text>
      <InsightsContainer data={data} />
    </>
  );
}
