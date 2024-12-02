// Components
import { Button } from '../ui/button';

// Icons
import { ArrowUpDown } from 'lucide-react';

// Types
import { Column } from '@tanstack/react-table';
import { Asset } from '@/utils/web3/fetchFungibleAssets';

////////////////////////////////////////////////////////////////////////////////

type TableHeaderButton = {
  column: Column<Asset, unknown>;
  label: string;
};

export default function TableHeaderButton({ column, label }: TableHeaderButton) {
  return (
    <Button variant="link" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
