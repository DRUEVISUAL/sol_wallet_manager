'use client';

// Components
import Image from 'next/image';

// Hooks
import { useState } from 'react';

// Images
import copy from '../../../public/svg/copy.svg';
import check from '../../../public/svg/check.svg';

////////////////////////////////////////////////////////////////////////////////

type CopyButtonProps = {
  value: string;
};

export default function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <button className="size-4 min-w-4" onClick={handleCopy}>
      <Image
        src={isCopied ? check : copy}
        className="size-full object-contain pointer-events-none"
        alt="Copy token address"
      />
    </button>
  );
}
