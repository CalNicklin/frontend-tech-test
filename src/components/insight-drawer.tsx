import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@client/components/ui/sheet';
import close from '@client/assets/close.svg';
import { Statuses } from '@/shared/types';
import { api } from '../api/api';
import { Text } from './ui/text';
import { OnTrackTag } from './on-track-tag';
import { cn } from '@client/utils';

export function InsightDrawer({ status }: { status: Statuses }) {
  const { data } = useQuery({
    queryKey: ['insight-details'],
    queryFn: api.fetchInsights,
  });

  const textContent = useMemo(() => {
    return {
      title: data?.title,
      description:
        status === Statuses.OnTrack
          ? data?.onTrackDescription
          : data?.offTrackDescription,
      details: {
        creditScoreTitle: data?.details[0].title,
        creditScoreDescription: data?.details[0].description,
        moveTitle: data?.details[1].title,
        moveDescription: data?.details[1].description,
      },
    };
  }, [data, status]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Text>Learn more</Text>
      </SheetTrigger>
      <SheetContent
        className={cn(
          'w-[400px] sm:w-[540px] bg-white',
          'data-[state=open]:animate-slide-in-from-right',
          'data-[state=closed]:animate-slide-out-to-right',
        )}
        side="right"
      >
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <OnTrackTag status={status} />
            <SheetTrigger asChild>
              <button type="button">
                <img src={close} alt="Close" />
                <span className="sr-only">Close</span>
              </button>
            </SheetTrigger>
          </div>
          <SheetTitle className="text-2xl font-semibold">
            {textContent.title}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <p className="text-base">
            {status === Statuses.OnTrack
              ? data?.onTrackDescription
              : data?.offTrackDescription}
          </p>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {textContent.details.creditScoreTitle}
            </h3>
            <p className="text-muted-foreground">
              {textContent.details.creditScoreDescription}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {textContent.details.moveTitle}
            </h3>
            <p className="text-muted-foreground">
              {textContent.details.moveDescription}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
