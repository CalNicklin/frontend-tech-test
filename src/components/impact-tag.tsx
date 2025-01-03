import { type ImpactLevels } from '@shared/types';
import { Pill } from './ui/pill';
import { Text } from './ui/text';

interface ImpactTagProps {
  impact: ImpactLevels;
}

export function ImpactTag({ impact }: ImpactTagProps) {
  return (
    <Pill colour="neutral-step-1">
      <Text
        type="p"
        variant="body"
        colour="neutral-step-0"
        className="uppercase"
      >
        {`${impact} impact`}
      </Text>
    </Pill>
  );
}
