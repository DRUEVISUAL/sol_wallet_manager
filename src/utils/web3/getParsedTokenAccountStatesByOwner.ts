import { CONNECTION } from '@/lib/constants';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

////////////////////////////////////////////////////////////////////////////////

export default async function getParsedTokenAccountStatesByOwner(publicKey: PublicKey) {
  const response = await CONNECTION.getParsedTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });

  const { value } = response;

  const assets = value.reduce((acc: Record<string, string>, token) => {
    const info = token.account.data.parsed.info;
    acc[info.mint] = info.state;
    return acc;
  }, {});

  return assets;
}
