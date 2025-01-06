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

  if (drawer && status) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            aria-label="Open insight drawer"
            type="button"
            className="w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand1-step2 focus-visible:ring-offset-2 focus-visible:rounded-M"
          >
            <InsightCardContent
              heading={heading}
              body={body}
              status={status}
              impact={impact}
              drawer={drawer}
            />
          </button>
        </SheetTrigger>
        <InsightDrawer status={status} isOpen={isOpen} />
      </Sheet>
    );
  }

  return (
    <InsightCardContent
      heading={heading}
      body={body}
      status={status}
      impact={impact}
      drawer={drawer}
    />
  );
}
