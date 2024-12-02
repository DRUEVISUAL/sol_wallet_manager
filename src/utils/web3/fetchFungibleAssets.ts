// Utilities
import searchAssets from './searchAssets';
import getParsedTokenAccountStatesByOwner from './getParsedTokenAccountStatesByOwner';
import getWSOLPrice from './getWSOLPrice';
import processAsset from './processAsset';

// Types
import { PublicKey } from '@solana/web3.js';
import { DAS } from 'helius-sdk';

////////////////////////////////////////////////////////////////////////////////

export interface Asset {
  interface: string;
  group: {
    image: string | undefined;
    tokenName: string;
    tokenAddress?: string;
  };
  balance: {
    value: number;
    symbol: string;
  };
  balanceValueUSD: number;
  pricePerTokenInSOL: number | undefined;
  pricePerTokenInUSD: number;
  marketCap: number | '-';
  liquidity: number | undefined;
  burnPercent: number | undefined;
  decimals: number;
  isLPLocked: boolean | undefined;
  isFrozen: boolean;
}

export default async function fetchFungibleAssets(ownerAddress: PublicKey) {
  try {
    const WSOLPrice = await getWSOLPrice();

    let assets = await searchAssets(ownerAddress);

    const parsedTokenAccounts = await getParsedTokenAccountStatesByOwner(ownerAddress);

    assets = assets.items.filter(
      (asset: DAS.GetAssetResponse) => asset !== null && parsedTokenAccounts[asset.id] !== undefined
    );

    const processedAssets = await Promise.all(
      assets.map((token: DAS.GetAssetResponse) =>
        processAsset(token, parsedTokenAccounts, WSOLPrice)
      )
    );

    return processedAssets;
  } catch (error) {
    console.error('Problem with fetch operation:', error);
    return [];
  }
}