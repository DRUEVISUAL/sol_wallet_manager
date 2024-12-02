export default async function raydiumFetchTokenPrice(tokenAddress: string): Promise<number | null> {
  const response = await fetch(`https://api-v3.raydium.io/mint/price?mints=${tokenAddress}`);

  const responseJSON = await response.json();

  return Number(responseJSON.data[tokenAddress]);
}
