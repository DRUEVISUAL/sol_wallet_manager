// Components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '../ui/button';

// Icons
import { ArrowUpDown } from 'lucide-react';

// Types
import { Column } from '@tanstack/react-table';
import { Asset } from '@/utils/web3/fetchFungibleAssets';

////////////////////////////////////////////////////////////////////////////////

type TableHeaderButtonWithTooltip = {
  column: Column<Asset, unknown>;
  label: string;
  tooltip: string;
};

export default function TableHeaderButtonWithTooltip({
  column,
  label,
  tooltip,
}: TableHeaderButtonWithTooltip) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
