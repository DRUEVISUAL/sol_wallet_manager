// Utilities
import { cn } from '@/lib/utils';

// Types
import { ReactNode } from 'react';

////////////////////////////////////////////////////////////////////////////////

type WrapperProps = { children: ReactNode; className?: string };

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={cn('w-screen h-screen min-h-[667px] max-w-screen-2xl mx-auto', className)}>
      {children}
    </div>
  );
}
