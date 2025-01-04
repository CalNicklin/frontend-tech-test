import { cn } from '@client/utils';
import { Pill, type PillVariantProps } from './pill';
import { Text, type TextVariantProps } from './text';

interface TagProps {
  pillColor: PillVariantProps['colour'];
  textColor: TextVariantProps['colour'];
  text: string;
  className?: string;
}

export function Tag({ pillColor, textColor, text, className }: TagProps) {
  return (
    <Pill
      colour={pillColor}
      className={cn(
        'rounded-S w-fit py-[calc(theme(spacing.XXS)/2)] px-XS',
        className,
      )}
    >
      <Text
        type="p"
        variant="body"
        fontSize="XS"
        colour={textColor}
        className="uppercase text-center leading-XS tracking-wide"
      >
        {text}
      </Text>
    </Pill>
  );
}
