import { useQuery } from '@tanstack/react-query';
import { SDUISchema } from '@shared/schemas';
import { Text } from './components/ui/text';
import { SDUIRenderer } from './components/renderer';
import { env } from './env';

export function App() {
  const { data: schema } = useQuery({
    queryKey: ['sdui'],
    queryFn: async () => {
      const response = await fetch(`${env.API_URL}/credit`);
      const data = (await response.json()) as typeof SDUISchema;
      return SDUISchema.parse(data);
    },
  });

  if (!schema) return null;

  return (
    <>
      <Text type="h1" colour="brand1-step0" variant="strong">
        Insights
      </Text>
      <SDUIRenderer schema={schema} />
    </>
  );
}
