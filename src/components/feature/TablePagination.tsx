// Components
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Types
import { Table } from '@tanstack/react-table';

////////////////////////////////////////////////////////////////////////////////

type TablePaginationProps<TData> = { table: Table<TData> };

export default function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  return (
    <div className="flex items-center gap-2 p-4 w-full justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </Button>
      <strong>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
      </strong>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </Button>

      <Select onValueChange={(e) => table.setPageSize(Number(e))} defaultValue={'10'}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={`Show ${table.getState().pagination.pageSize} rows`} />
        </SelectTrigger>
        <SelectContent>
          {['10', '20', '30', '40', '50'].map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize}>
              {pageSize} rows
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
