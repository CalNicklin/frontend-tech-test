import { useState } from 'react';
import { type ImpactLevels, type Statuses } from '@/types/types';
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
    <article className="h-full min-w-[9.375rem] flex">
      {drawer && status ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="w-full h-full" asChild>
            <div className="h-full">
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
