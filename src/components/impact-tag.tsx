import { type ImpactLevels } from '@shared/types';
import { Tag } from './ui/tag';

interface ImpactTagProps {
  impact: ImpactLevels;
  className?: string;
}

export function ImpactTag({ impact, className }: ImpactTagProps) {
  return (
    <Tag
      pillColor="neutral-step1"
      textColor="brand1-step0"
      text={`${impact.toUpperCase()} IMPACT`}
      className={className}
      dataTestId="impact-tag"
    />
  );
}
