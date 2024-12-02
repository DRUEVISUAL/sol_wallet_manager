// Types
import { DAS } from "helius-sdk"
import { Asset } from "./fetchFungibleAssets";

// Utilities
import { getPoolData } from "./getPoolData";

////////////////////////////////////////////////////////////////////////////////

export default async function processAsset(
    token: DAS.GetAssetResponse,
    parsedTokenAccounts: Record<string, string>,
    WSOLPrice: number
): Promise<Asset | null> {
    try {
        const { token_info, content, id: tokenAddress, interface: tokenInterface } = token;
        const {
            symbol: tokenInfoSymbol,
            balance: rawBalance = 0,
            decimals = 0,
            supply = 0,
        } = token_info ?? {};
        const { image } = content?.links ?? {};
        const { name: tokenName = '-', symbol: metadataSymbol } = content?.metadata ?? {};

        const poolData = await getPoolData(tokenAddress, WSOLPrice);

        if (!poolData) {
            console.warn(`Skipping asset due to missing pool data on raydium: ${tokenAddress}`);
            return null;
        }

        const {
            liquidity,
            burnPercent,
            isLPLocked,
            pricePerTokenInSOL,
            pricePerTokenInUSD = 0,
        } = poolData;
        const balance = rawBalance / 10 ** decimals;
        const balanceValueUSD = pricePerTokenInUSD * balance;
        const isFrozen = parsedTokenAccounts?.[tokenAddress] === 'frozen';
        const marketCap =
            supply > 0
                ? Math.ceil(Number(((supply / 10 ** decimals) * pricePerTokenInSOL).toFixed(2)) * WSOLPrice)
                : 0;

        return {
            interface: tokenInterface,
            group: {
                image,
                tokenName,
                tokenAddress,
            },
            balance: {
                value: balance,
                symbol: tokenInfoSymbol || metadataSymbol || '-',
            },
            pricePerTokenInUSD,
            balanceValueUSD,
            liquidity,
            marketCap,
            burnPercent,
            pricePerTokenInSOL,
            isLPLocked,
            decimals,
            isFrozen,
        };
    } catch (error) {
        console.error(`Error processing token ${token.id}:`, error);
        return null;
    }
}

