import { type ImpactLevels, type Statuses } from '@/types/types';
import { cn } from './lib/utils';
import { Card } from './ui/card';
import { ImpactTag } from './impact-tag';
import { OnTrackTag } from './on-track-tag';
import { Text } from './ui/text';

interface InsightCardContentProps {
  heading: string;
  body: string;
  status: Statuses | undefined;
  impact: ImpactLevels;
  drawer: boolean;
}

export function InsightCardContent({
  heading,
  body,
  status,
  impact,
  drawer,
}: InsightCardContentProps) {
  return (
    <Card
      variant="insight"
      data-testid="insight-card"
      className={cn('h-full group', drawer ? 'cursor-pointer' : '')}
    >
      <div className="flex flex-col h-full gap-y-M">
        <header className=" gap-S L:flex L:flex-row L:items-center">
          <OnTrackTag status={status} />
          <ImpactTag impact={impact} className="hidden L:block" />
        </header>

        <div className="flex-grow overflow-hidden">
          <Text
            type="h3"
            variant="strong"
            fontSize="M"
            colour="brand1-step0"
            data-testid="insight-heading"
          >
            {heading}
          </Text>
          <Text
            type="p"
            variant="body"
            colour="brand1-step0"
            fontSize="S"
            data-testid="insight-body"
          >
            {body}
          </Text>
        </div>

        {drawer && status ? (
          <div className="mt-M">
            <Text
              variant="strong"
              colour="brand1-step1"
              fontSize="S"
              className="hover:underline hover:underline-offset-1 hover:decoration-[1.5px] hover:text-brand1-step2"
            >
              Learn more
            </Text>
          </div>
        ) : null}

        <div className="L:hidden w-full flex items-center justify-center">
          <ImpactTag impact={impact} className="min-w-full" />
        </div>
      </div>
    </Card>
  );
}
