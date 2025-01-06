import { type ImpactLevels, type Statuses } from '@shared/types';
import { Card } from './ui/card';
import { Text } from './ui/text';
import { OnTrackTag } from './on-track-tag';
import { ImpactTag } from './impact-tag';

interface InsightCardProps {
  heading: string;
  body: string;
  impact: ImpactLevels;
  status: Statuses | undefined;
  error?: boolean;
}

export function InsightCard({
  heading,
  body,
  impact,
  status,
}: InsightCardProps) {
  return (
    <article className="h-full min-w-[9.375rem]">
      <Card variant="insight" data-testid="insight-card" className="h-full">
        <div className="flex flex-col h-full gap-y-M">
          <header className=" gap-S L:flex L:flex-row L:items-center">
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
