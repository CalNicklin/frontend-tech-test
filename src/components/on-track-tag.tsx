import { Statuses } from '@shared/types';
import { Tag } from './ui/tag';

interface OnTrackTagProps {
  status: Statuses | undefined;
  className?: string;
}

function tagText(status: Statuses | undefined) {
  if (status === undefined) {
    return 'status not available'.toUpperCase();
  }
  return status === Statuses.OnTrack
    ? 'on track'.toUpperCase()
    : 'off track'.toUpperCase();
}

function tagColor(status: Statuses | undefined) {
  if (status === undefined) {
    return 'neutral-step1';
  }
  return status === Statuses.OnTrack ? 'brand2-step1' : 'brand3-step1';
}

function tagTextColor(status: Statuses | undefined) {
  if (status === undefined) {
    return 'neutral-step0';
  }
  return status === Statuses.OnTrack ? 'brand2-step0' : 'brand3-step0';
}

export function OnTrackTag({ status, className }: OnTrackTagProps) {
  return (
    <Tag
      pillColor={tagColor(status)}
      textColor={tagTextColor(status)}
      text={tagText(status)}
      className={className}
      dataTestId="on-track-tag"
    />
  );
}
