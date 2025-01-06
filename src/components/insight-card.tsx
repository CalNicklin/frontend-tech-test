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
  return (
    <article className="h-full min-w-[9.375rem]">
      {drawer && status ? (
        <Sheet>
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
          <InsightDrawer status={status} />
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
