import { Statuses } from '@/shared/types';
import { Pill } from './ui/pill';
import { Text } from './ui/text';

interface OnTrackTagProps {
  status: Statuses | undefined;
}

export function OnTrackTag({ status }: OnTrackTagProps) {
  if (!status) return null;

  return (
    <Pill
      colour={status === Statuses.OnTrack ? 'brand2-step1' : 'brand3-step0'}
      className="min-h-M rounded-S"
    >
      <Text
        type="p"
        variant="body"
        fontSize="XS"
        colour={status === Statuses.OnTrack ? 'brand2-step0' : 'brand3-step1'}
        className="uppercase tracking-wide"
      >
        {status === Statuses.OnTrack ? 'On Track' : 'Off Track'}
      </Text>
    </Pill>
  );
}
