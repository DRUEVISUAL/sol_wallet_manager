'use client';

// Types
import { columns } from '@/lib/tableColumns';
import { PublicKey } from '@solana/web3.js';
import { FormEvent } from 'react';

// Hooks
import { useEffect, useState } from 'react';

// Components
import { DataTable } from '../feature/DataTable';
import { Input } from '../ui/input';

// Utilities
import fetchSearchFungibleAssets, { Asset } from '@/utils/web3/fetchFungibleAssets';

////////////////////////////////////////////////////////////////////////////////

export default function MainPage() {
  const [data, setData] = useState<Asset[] | []>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAssets(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const publicKey = new PublicKey(inputValue);
      if (!PublicKey.isOnCurve(publicKey.toBytes())) {
        setError('Invalid Solana wallet address.');
        return;
      }

      setIsLoading(true);
      setError('');
      const data = await fetchSearchFungibleAssets(publicKey);
      setData(data);
    } catch {
      setError('Invalid Solana wallet address.');
    }
  }

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  return (
    <div className="p-4">
      <form className="flex flex-col gap-2 max-w-sm mx-auto mb-8" onSubmit={fetchAssets}>
        <div>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Enter wallet address"
              className="rounded-r-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              pattern="^[1-9A-HJ-NP-Za-km-z]{32,44}$" // Pattern for Base58 encoded strings
              title="Enter a valid Solana wallet address."
              required
            />
            <Input
              type="submit"
              value="Search"
              className="bg-white text-black rounded-l-none w-max cursor-pointer"
            />
          </div>
          <p className="text-muted-foreground w-full text-center mt-4 text-sm">
            Currently the app supports only Raydium tokens
          </p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
