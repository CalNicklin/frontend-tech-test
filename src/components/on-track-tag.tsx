import { Statuses } from '@shared/types';
import { Tag } from './ui/tag';

interface OnTrackTagProps {
  status: Statuses | undefined;
  className?: string;
}

export function OnTrackTag({ status, className }: OnTrackTagProps) {
  const isOnTrack = status === Statuses.OnTrack;

  return (
    <Tag
      pillColor={isOnTrack ? 'brand2-step1' : 'brand3-step1'}
      textColor={isOnTrack ? 'brand2-step0' : 'brand3-step0'}
      text={isOnTrack ? 'On Track' : 'Off Track'}
      className={className}
    />
  );
}
