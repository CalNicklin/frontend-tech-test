import { type CardElement } from '@shared/types';
import { Card } from './ui/card';
import { Text } from './ui/text';
import { OnTrackTag } from './on-track-tag';
import { ImpactTag } from './impact-tag';

interface InsightCardProps {
  elements: CardElement[];
  actions?: {
    onClick?: {
      type: 'drawer' | 'modal';
      data: Record<string, unknown>;
    };
  };
}

export function InsightCard({ elements, actions }: InsightCardProps) {
  const status = elements.find((e) => e.type === 'status');
  const heading = elements.find((e) => e.type === 'heading');
  const body = elements.find((e) => e.type === 'body');
  const impact = elements.find((e) => e.type === 'impact');

  const handleClick = () => {
    if (actions?.onClick?.type === 'drawer') {
      // Handle drawer opening
    }
  };

  return (
    <Card
      variant="insight"
      className="items-start"
      onClick={actions?.onClick ? handleClick : undefined}
    >
      <OnTrackTag status={status?.value} />
      <Text type="p" variant="strong" colour="brand1-step0">
        {heading?.text}
      </Text>
      <Text type="p" variant="body" colour="neutral-step-0">
        {body?.text}
      </Text>
      <ImpactTag impact={impact?.level} />
    </Card>
  );
}
