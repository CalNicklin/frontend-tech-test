import { Statuses } from '@/shared/types';
import { Pill } from './ui/pill';
import { Text } from './ui/text';

interface OnTrackTagProps {
  status: Statuses | undefined;
}

export function OnTrackTag({ status }: OnTrackTagProps) {
  return (
    <Pill
      colour={status === Statuses.OnTrack ? 'brand2-step1' : 'brand3-step1'}
      padding="XS"
      className="rounded-S w-fit py-1"
    >
      <Text
        type="p"
        variant="body"
        fontSize="XS"
        colour={status === Statuses.OnTrack ? 'brand2-step0' : 'brand3-step0'}
        className="uppercase tracking-wide"
      >
        {status === Statuses.OnTrack ? 'On Track' : 'Off Track'}
      </Text>
    </Pill>
  );
}
