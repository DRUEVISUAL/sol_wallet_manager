import { PublicKey } from '@solana/web3.js';

////////////////////////////////////////////////////////////////////////////////

export default async function searchAssets(ownerAddress: PublicKey) {
  const fetchBody = {
    jsonrpc: '2.0',
    id: 'get-search-assets',
    method: 'searchAssets',
    params: {
      ownerAddress: ownerAddress.toBase58(),
      tokenType: 'fungible',
      displayOptions: {
        showZeroBalance: true,
      },
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_RPC_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody),
    });

    const { result } = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Failed to fetch assets: ${error}`);
  }
}
