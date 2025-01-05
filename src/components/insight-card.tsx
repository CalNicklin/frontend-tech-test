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
    <article>
      <Card variant="insight" data-testid="insight-card">
        <div className="flex flex-col h-full gap-y-M">
          <header className="L:flex L:flex-row L:gap-M L:items-center">
            <OnTrackTag status={status} />
            <ImpactTag impact={impact} className="hidden L:block" />
          </header>

          <div className="flex-grow overflow-hidden">
            <Text
              type="h3"
              variant="strong"
              colour="brand1-step0"
              data-testid="insight-heading"
            >
              {heading}
            </Text>
            <Text
              type="p"
              variant="body"
              colour="brand1-step0"
              data-testid="insight-body"
            >
              {body}
            </Text>
          </div>

          <div className="L:hidden w-full flex items-center justify-center">
            <ImpactTag impact={impact} />
          </div>
        </div>
      </Card>
    </article>
  );
}
