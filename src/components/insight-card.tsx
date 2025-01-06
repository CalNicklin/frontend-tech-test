import { useState } from 'react';
import { type ImpactLevels, type Statuses } from '@shared/types';
import { InsightDrawer } from './insight-drawer';
import { Sheet, SheetTrigger } from './ui/sheet';
import { InsightCardContent } from './insight-card-content';

interface InsightCardProps {
  heading: string;
  body: string;
  impact: ImpactLevels;
  status: Statuses | undefined;
  drawer: boolean;
  error?: boolean;
}

export function InsightCard({
  heading,
  body,
  impact,
  status,
  drawer,
}: InsightCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="h-full min-w-[9.375rem]">
      {drawer && status ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="w-full" asChild>
            <div>
              <InsightCardContent
                heading={heading}
                body={body}
                status={status}
                impact={impact}
                drawer={drawer}
              />
            </div>
          </SheetTrigger>
          <InsightDrawer status={status} isOpen={isOpen} />
        </Sheet>
      ) : (
        <InsightCardContent
          heading={heading}
          body={body}
          status={status}
          impact={impact}
          drawer={drawer}
        />
      )}
    </article>
  );
}
