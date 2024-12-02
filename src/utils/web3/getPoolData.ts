import { CONNECTION, RAYDIUM } from "@/lib/constants";
import { LIQUIDITY_STATE_LAYOUT_V4, WSOL } from "@raydium-io/raydium-sdk";
import { PublicKey } from "@solana/web3.js";

////////////////////////////////////////////////////////////////////////////////

export async function getPoolData(tokenAddress: string, WSOLPrice: number) {
    try {
        const { data } = await RAYDIUM.api.fetchPoolByMints({
            mint1: WSOL.mint,
            mint2: tokenAddress,
        });

        const poolData = data?.[0];

        if (!poolData) {
            throw new Error(`No pool data found on raydium for tokenAddress: ${tokenAddress}`);
        }

        const poolId = poolData.id;
        const burnPercent = poolData.burnPercent || 0;
        const isLPLocked = burnPercent > 95;

        const account = await CONNECTION.getAccountInfo(new PublicKey(poolId));
        if (!account?.data) {
            throw new Error(`Failed to fetch account info for poolId: ${poolId}`);
        }

        const decodedAccount = LIQUIDITY_STATE_LAYOUT_V4.decode(account.data);

        const isWSOLTheBase = decodedAccount.baseMint.toBase58() === WSOL.mint;
        const vaultTokenA = isWSOLTheBase ? decodedAccount.baseVault : decodedAccount.quoteVault; // WSOL = A
        const vaultTokenB = isWSOLTheBase ? decodedAccount.quoteVault : decodedAccount.baseVault; // SPL = B

        const amountTokenA = (await CONNECTION.getTokenAccountBalance(vaultTokenA)).value.uiAmount || 0;
        const amountTokenB = (await CONNECTION.getTokenAccountBalance(vaultTokenB)).value.uiAmount || 0;

        const pricePerTokenInSOL = Number((amountTokenA / amountTokenB).toFixed(20));
        const pricePerTokenInUSD = pricePerTokenInSOL * WSOLPrice;

        const liquidity = (amountTokenA * WSOLPrice + amountTokenB * pricePerTokenInSOL) * 2;

        return { liquidity, burnPercent, isLPLocked, pricePerTokenInSOL, pricePerTokenInUSD };
    } catch (error) {
        console.error(`Error in getPoolData for token ${tokenAddress}:`, error);
        return null;
    }
}