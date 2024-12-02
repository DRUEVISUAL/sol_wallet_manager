import { PublicKey } from '@solana/web3.js';
import { CONNECTION } from '../../lib/constants';

////////////////////////////////////////////////////////////////////////////////

export default async function getTokenAccountBalance(tokenAddress: string) {
  const response = await CONNECTION.getTokenAccountBalance(new PublicKey(tokenAddress));

  const balance = Number(response.value.uiAmountString);

  return balance;
}
