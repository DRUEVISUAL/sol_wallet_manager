// Components
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Images
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

////////////////////////////////////////////////////////////////////////////////

type DropdownProps = { data: Record<string, string> };

export default function Dropdown({ data }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Swap</DropdownMenuLabel>
        <div className="cursor-pointer">
          <Link
            href={`https://raydium.io/swap/?outputMint=sol&inputMint=${data.tokenAddress}`}
            target="_blank"
          >
            <DropdownMenuItem>Raydium</DropdownMenuItem>
          </Link>
        </div>
        {/* <DropdownMenuItem>Jupiter</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Orca</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Meteora</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Info</DropdownMenuLabel>
        <div className="cursor-pointer">
          <Link href={`https://solscan.io/token/${data.tokenAddress}`} target="_blank">
            <DropdownMenuItem>Solscan</DropdownMenuItem>
          </Link>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Market</DropdownMenuLabel>
        <div className="cursor-pointer">
          <Link href={`https://dexscreener.com/solana/${data.tokenAddress}`} target="_blank">
            <DropdownMenuItem>Dexscreener</DropdownMenuItem>
          </Link>
        </div>
        {/* <DropdownMenuItem>SolanaFM</DropdownMenuItem>
        <DropdownMenuItem>Explorer</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Check</DropdownMenuLabel>
        <div className="cursor-pointer">
          <Link href={`https://www.solanatracker.io/rugcheck/${data.tokenAddress}`} target="_blank">
            <DropdownMenuItem>Solana Tracker</DropdownMenuItem>
          </Link>
        </div>
        {/* <DropdownMenuItem>Rughcheck</DropdownMenuItem> */}
        <DropdownMenuSeparator />

        <DropdownMenuLabel>Burn</DropdownMenuLabel>
        <div className="cursor-pointer">
          <Link href={`https://www.burnthesol.xyz/en`} target="_blank">
            <DropdownMenuItem>Burn The SOL</DropdownMenuItem>
          </Link>
        </div>
        {/* <DropdownMenuItem>Sol Incinerator</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
