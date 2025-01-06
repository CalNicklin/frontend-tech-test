import { Statuses } from '@/types/types';
import { Tag } from './ui/tag';
import { type TextVariantProps } from './ui/text';
import { type PillVariantProps } from './ui/pill';

interface OnTrackTagProps {
  status: Statuses | undefined;
  className?: string;
}

function getTagProperties(status: Statuses | undefined): {
  text: string;
  color: PillVariantProps['colour'];
  textColor: TextVariantProps['colour'];
} {
  if (status === undefined) {
    return {
      text: 'status not available'.toUpperCase(),
      color: 'neutral-step1',
      textColor: 'neutral-step0',
    };
  }

  return status === Statuses.OnTrack
    ? {
        text: 'on track'.toUpperCase(),
        color: 'brand2-step1',
        textColor: 'brand2-step0',
      }
    : {
        text: 'off track'.toUpperCase(),
        color: 'brand3-step1',
        textColor: 'brand3-step0',
      };
}

export function OnTrackTag({ status }: OnTrackTagProps) {
  const { text, color, textColor } = getTagProperties(status);
  return (
    <Tag
      pillColor={color}
      textColor={textColor}
      text={text}
      dataTestId="on-track-tag"
    />
  );
}
