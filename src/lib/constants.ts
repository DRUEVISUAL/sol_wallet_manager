import { Raydium } from '@raydium-io/raydium-sdk-v2';
import { Connection } from '@solana/web3.js';

////////////////////////////////////////////////////////////////////////////////

if (process.env.NEXT_PUBLIC_RPC_URL === undefined) throw new Error('RPC url missing')

export const CONNECTION = new Connection(process.env.NEXT_PUBLIC_RPC_URL!);

export const RAYDIUM = await Raydium.load({
  connection: CONNECTION,
  disableLoadToken: true,
});




