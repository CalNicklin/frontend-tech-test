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

/**
 * This is the insight card container. It gets wrapped in a sheet trigger if the drawer prop is true.
 * The sheet trigger is a button that opens the insight drawer. This maintains full accessibility to toggle the drawer.
 * I've implemented a basic branded focus ring which is in keeping with the drawer close, but would expect this to be handled by the design system.
 *
 * The drawer fetches its own data, and is passed the status of the insight for rendering the status.
 *
 * Drawer action is pure css, the useState implementation here enables/disables the useQuery fetching.
 */
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
