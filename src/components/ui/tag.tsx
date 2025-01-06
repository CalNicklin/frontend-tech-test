import { cn } from '@client/utils';
import { Pill, type PillVariantProps } from './pill';
import { Text, type TextVariantProps } from './text';

interface TagProps {
  pillColor: PillVariantProps['colour'];
  textColor: TextVariantProps['colour'];
  text: string;
  className?: string;
  dataTestId?: string;
}

export function Tag({
  pillColor,
  textColor,
  text,
  className,
  dataTestId,
}: TagProps) {
  return (
    <Pill
      role="status"
      aria-label={text}
      colour={pillColor}
      className={cn(
        'rounded-S w-fit py-[calc(theme(spacing.XS)/2)] px-XS',
        className,
      )}
      data-testid={dataTestId}
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
