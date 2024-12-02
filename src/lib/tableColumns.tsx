'use client';

// Utilities
import formatToSubscribt from '@/utils/helper/formatToSubscribt';

// Types
import { Asset } from '@/utils/web3/fetchFungibleAssets';
import { ColumnDef } from '@tanstack/react-table';

// Components
import Dropdown from '@/components/feature/Dropdown';
import TableHeaderButtonWithTooltip from '@/components/feature/TableHeaderButtonWithTooltip';
import ImageNameRow from '@/components/ui_custom/ImageNameRow';
import TableHeaderButton from '@/components/feature/TableHeaderButton';
import BooleanRow from '@/components/ui_custom/BooleanRow';

////////////////////////////////////////////////////////////////////////////////

export const columns: ColumnDef<Asset>[] = [
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const data: Record<string, string> = row.getValue('group');

      return <Dropdown data={data} />;
    },
  },
  {
    accessorKey: 'group',
    enableHiding: false,
    header: () => {
      return <div>Token</div>;
    },
    cell: ({ row }) => {
      const group: Record<string, string> = row.getValue('group');
      return <ImageNameRow group={group} />;
    },
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <TableHeaderButton column={column} label={'Balance'} />,
    cell: ({ row }) => {
      const group: { value: number; symbol: string } = row.getValue('balance');
      const balance: number = group.value;
      const symbol: string = group.symbol;
      const { nonZeroIndex, nonZeroNumbers, subscript } = formatToSubscribt(balance);

      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
      }).format(balance);

      if (balance === 0) {
        return (
          <div className="min-w-max">
            0 <span className="opacity-60">{` ${symbol}`}</span>
          </div>
        );
      }

      if (nonZeroIndex < 5)
        return (
          <div className="min-w-max">
            {formatted} <span className="opacity-60">{` ${symbol}`}</span>
          </div>
        );

      if (String(balance).split('.')[1] === undefined)
        return (
          <div className="min-w-max">
            {formatted} <span className="opacity-60">{` ${symbol}`}</span>
          </div>
        );

      return (
        <div className="min-w-max">
          0.0<sub>{subscript}</sub>
          {nonZeroNumbers} <span className="opacity-60">{` ${symbol}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'balanceValueUSD',
    header: ({ column }) => (
      <TableHeaderButtonWithTooltip
        column={column}
        label={'Bal. ($)'}
        tooltip="Balance value in USD"
      />
    ),
    cell: ({ row }) => {
      const balance: number = row.getValue('balanceValueUSD');
      const { nonZeroIndex, nonZeroNumbers, subscript } = formatToSubscribt(balance);

      if (balance === 0) {
        return <div>$0</div>;
      }

      if (nonZeroIndex < 5) return <div>${balance.toFixed(4)}</div>;

      if (String(balance).split('.')[1] === undefined) return <div>${balance}</div>;

      return (
        <div>
          $0.0<sub>{subscript}</sub>
          {nonZeroNumbers}
        </div>
      );
    },
  },
  {
    accessorKey: 'pricePerTokenInSOL',
    header: ({ column }) => (
      <TableHeaderButtonWithTooltip
        column={column}
        label={'PPT (SOL)'}
        tooltip="Price per Token in SOL"
      />
    ),
    cell: ({ row }) => {
      const balance: number = row.getValue('pricePerTokenInSOL');
      const { nonZeroIndex, nonZeroNumbers, subscript } = formatToSubscribt(balance);

      if (balance === 0) {
        return <div>0 SOL</div>;
      }

      if (nonZeroIndex < 5) return <div>{balance} SOL</div>;

      if (String(balance).split('.')[1] === undefined) return <div>${balance}</div>;

      return (
        <div>
          0.0<sub>{subscript}</sub>
          {nonZeroNumbers} SOL
        </div>
      );
    },
  },

  {
    accessorKey: 'pricePerTokenInUSD',
    header: ({ column }) => (
      <TableHeaderButtonWithTooltip
        column={column}
        label={'PPT ($)'}
        tooltip="Price per Token in USD"
      />
    ),
    cell: ({ row }) => {
      const balance: number = row.getValue('pricePerTokenInUSD');
      const { nonZeroIndex, nonZeroNumbers, subscript } = formatToSubscribt(balance);

      if (balance === 0) {
        return <div>$0</div>;
      }

      if (nonZeroIndex < 5) return <div>${balance}</div>;

      if (String(balance).split('.')[1] === undefined) return <div>${balance}</div>;

      return (
        <div>
          $0.0<sub>{subscript}</sub>
          {nonZeroNumbers}
        </div>
      );
    },
  },
  {
    accessorKey: 'marketCap',
    header: ({ column }) => (
      <TableHeaderButtonWithTooltip column={column} label={'MCap'} tooltip="Market Cap" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('marketCap'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount);
      return <div style={{ minWidth: 'max-content' }}>{formatted}</div>;
    },
  },
  {
    accessorKey: 'liquidity',
    header: ({ column }) => (
      <TableHeaderButtonWithTooltip column={column} label={'Liq'} tooltip="Liquidity" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('liquidity'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount);
      return <div style={{ minWidth: 'max-content' }}>{formatted}</div>;
    },
  },
  {
    accessorKey: 'burnPercent',
    header: ({ column }) => (
      <TableHeaderButtonWithTooltip column={column} label={'Burned'} tooltip="Liquidity Burned" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('burnPercent'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount / 100);
      return <div style={{ minWidth: 'max-content' }}>{formatted}</div>;
    },
  },
  {
    accessorKey: 'isLPLocked',
    header: ({ column }) => (
      <TableHeaderButtonWithTooltip column={column} label={'LPL'} tooltip="Liquidity Pool Locked" />
    ),
    cell: ({ row }) => {
      const value: boolean = row.getValue('isLPLocked');
      return <BooleanRow value={value} type="trueIsOk" />;
    },
  },
  {
    accessorKey: 'isFrozen',
    header: ({ column }) => (
      <TableHeaderButtonWithTooltip column={column} label={'Frozen'} tooltip="Frozen Asset" />
    ),
    cell: ({ row }) => {
      const value: boolean = row.getValue('isFrozen');
      return <BooleanRow value={value} type="falseIsOk" />;
    },
  },
  {
    accessorKey: 'group.tokenName',
    enableHiding: false,
    id: 'tokenName',
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: 'group.tokenAddress',
    enableHiding: false,
    id: 'tokenAddress',
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: 'balance.symbol',
    enableHiding: false,
    id: 'symbol',
    header: () => null,
    cell: () => null,
  },
];
