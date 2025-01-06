import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@client/components/ui/sheet';
import { Statuses } from '@/shared/types';
import { cn } from '@client/utils';
import { api } from '../api/api';
import { Text } from './ui/text';
import { OnTrackTag } from './on-track-tag';

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
    <SheetContent
      className={cn(
        'bg-white',
        'data-[state=open]:animate-slide-in-from-right',
        'data-[state=closed]:animate-slide-out-to-right',
      )}
      side="right"
    >
      <SheetHeader className="space-y-L mt-L">
        <div className="flex items-center justify-between">
          <OnTrackTag status={status} />
        </div>
        <SheetTitle>
          <Text
            variant="strong"
            colour="brand1-step0"
            fontSize="L"
            className="text-left mb-XS"
          >
            {textContent.title}
          </Text>
        </SheetTitle>
      </SheetHeader>
      <div className="space-y-L">
        <Text colour="brand1-step0">
          {status === Statuses.OnTrack
            ? data?.onTrackDescription
            : data?.offTrackDescription}
        </Text>
        <div className="space-y-XS">
          <Text type="h3" colour="brand1-step0" variant="strong">
            {textContent.details.creditScoreTitle}
          </Text>
          <Text colour="brand1-step0">
            {textContent.details.creditScoreDescription}
          </Text>
        </div>
        <div className="space-y-XS">
          <Text type="h3" colour="brand1-step0" variant="strong">
            {textContent.details.moveTitle}
          </Text>
          <Text colour="brand1-step0">
            {textContent.details.moveDescription}
          </Text>
        </div>
      </div>
    </SheetContent>
  );
}
