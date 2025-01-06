import { useQuery } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';
import { useRef } from 'react';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@client/components/ui/sheet';
import { Statuses } from '@/shared/types';
import { cn } from '@client/utils';
import { api } from '../api/api';
import { Text } from './ui/text';
import { OnTrackTag } from './on-track-tag';
import { LoadingSpinner } from './ui/loading-spinner';

export function InsightDrawer({
  status,
  isOpen,
}: {
  status: Statuses;
  isOpen: boolean;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['insight-details'],
    queryFn: api.fetchInsights,
    enabled: isOpen,
  });

  if (isLoading) {
    return (
      <SheetContent
        ref={sheetRef}
        className={cn(
          'bg-white',
          'data-[state=open]:animate-slide-in-from-right',
          'data-[state=closed]:animate-slide-out-to-right',
        )}
        side="right"
      >
        <SheetTitle>
          <LoadingSpinner />
        </SheetTitle>
        <SheetDescription className="sr-only">
          Loading insight details
        </SheetDescription>
      </SheetContent>
    );
  }

  if (error) {
    Sentry.captureException(error);
  }

  if (isError || !data) {
    return (
      <SheetContent
        ref={sheetRef}
        className={cn(
          'bg-white',
          'data-[state=open]:animate-slide-in-from-right',
          'data-[state=closed]:animate-slide-out-to-right',
        )}
        side="right"
      >
        <Text
          type="p"
          colour="brand1-step0"
          variant="strong"
          fontSize="L"
          className="mt-L"
        >
          An error occurred while loading your credit report
        </Text>
        <SheetDescription className="sr-only">
          An error occurred while loading your credit report
        </SheetDescription>
      </SheetContent>
    );
  }

  const textContent = {
    title: data.title,
    description:
      status === Statuses.OnTrack
        ? data.onTrackDescription
        : data.offTrackDescription,
    details: {
      creditScoreTitle: data.details[0].title,
      creditScoreDescription: data.details[0].description,
      moveTitle: data.details[1].title,
      moveDescription: data.details[1].description,
    },
  };

  return (
    <SheetContent
      ref={sheetRef}
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
        <SheetDescription className="sr-only">
          {textContent.description}
        </SheetDescription>
      </SheetHeader>
      <div className="space-y-L">
        <Text colour="brand1-step0">{textContent.description}</Text>
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
