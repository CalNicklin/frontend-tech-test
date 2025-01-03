import { type ImpactLevels } from '@shared/types';
import { Pill } from './ui/pill';
import { Text } from './ui/text';

interface ImpactTagProps {
  impact: ImpactLevels;
  className?: string;
}

export function ImpactTag({ impact, className }: ImpactTagProps) {
  return (
    <Pill colour="neutral-step-1" className={className}>
      <Text
        type="p"
        variant="body"
        fontSize="XS"
        colour="brand1-step0"
        className="uppercase"
      >
        {`${impact} impact`}
      </Text>
    </Pill>
  );
}
