import { type ImpactLevels, type Statuses } from '@shared/types';
import { Card } from './ui/card';
import { Text } from './ui/text';
import { OnTrackTag } from './on-track-tag';
import { ImpactTag } from './impact-tag';

interface InsightCardProps {
  heading: string;
  body: string;
  impact: ImpactLevels;
  status: Statuses;
}

export function InsightCard({
  heading,
  body,
  impact,
  status,
}: InsightCardProps) {
  return (
    <Card variant="insight" data-testid="insight-card">
      <div className="flex flex-col h-full gap-y-M">
        <div className="L:flex L:flex-row L:gap-M L:items-center">
          <OnTrackTag status={status} data-testid="status" />
          <ImpactTag
            impact={impact}
            data-testid="impact"
            className="hidden L:block"
          />
        </div>

        <div className="flex-grow">
          <Text type="p" variant="strong" colour="brand1-step0">
            {heading}
          </Text>
          <Text type="p" variant="body" colour="brand1-step0">
            {body}
          </Text>
        </div>

        <div className="L:hidden w-full flex items-center justify-center">
          <ImpactTag impact={impact} data-testid="impact" />
        </div>
      </div>
    </Card>
  );
}
