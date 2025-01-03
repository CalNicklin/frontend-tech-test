import { type SDUISchema } from '@shared/types';
import { InsightCard } from './insight-card';

const componentMap = {
  insightCard: InsightCard,
} as const;

interface SDUIRendererProps {
  schema: SDUISchema;
}

export function SDUIRenderer({ schema }: SDUIRendererProps) {
  return (
    <div className="grid gap-4">
      {schema.elements.map((element) => {
        const Component = componentMap[element.type];

        return (
          <Component
            key={element.id}
            elements={element.elements}
            actions={element.actions}
          />
        );
      })}
    </div>
  );
}
