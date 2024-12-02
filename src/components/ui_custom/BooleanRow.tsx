import { cn } from '@/lib/utils';

type BooleanRowProps = { value: boolean; type: 'trueIsOk' | 'falseIsOk' };

export default function BooleanRow({ value, type }: BooleanRowProps) {
  return (
    <p
      className={cn(
        type === 'trueIsOk' && value
          ? 'text-green-600'
          : type === 'falseIsOk' && !value
          ? 'text-green-600'
          : 'text-red-600'
      )}
    >
      {value.toString()}
    </p>
  );
}
