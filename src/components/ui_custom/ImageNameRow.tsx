// Components
import Image from 'next/image';
import CopyButton from '../feature/CopyButton';

////////////////////////////////////////////////////////////////////////////////

type ImageNameRowProps = { group: Record<string, string> };

export default function ImageNameRow({ group }: ImageNameRowProps) {
  return (
    <div className="flex items-center gap-2">
      <CopyButton value={group.tokenAddress} />
      <Image
        src={group.image}
        alt={'Image for ' + group.tokenName}
        className="rounded-[4px] size-8 pointer-events-none object-contain"
        width={24}
        height={24}
        quality={50}
      />
      <p className="w-24 truncate">{group.tokenName}</p>
    </div>
  );
}
