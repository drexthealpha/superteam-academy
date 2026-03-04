import { Connection, PublicKey } from '@solana/web3.js';

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY!;
const HELIUS_RPC = `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const HELIUS_API = `https://api-devnet.helius.xyz/v0`;

export const connection = new Connection(HELIUS_RPC, 'confirmed');

export const XP_MINT_DEVNET = process.env.NEXT_PUBLIC_XP_MINT || '';
export const PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID || '';

export async function getTokenBalance(walletAddress: string, mintAddress: string): Promise<number> {
  try {
    const wallet = new PublicKey(walletAddress);
    const mint = new PublicKey(mintAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet, { mint });
    if (tokenAccounts.value.length === 0) return 0;
    const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    return typeof balance === 'number' ? balance : 0;
  } catch {
    return 0;
  }
}

export async function getNFTsByOwner(walletAddress: string): Promise<Array<{ mint: string; name: string; uri: string; attributes?: any[] }>> {
  try {
    const response = await fetch(`${HELIUS_API}/addresses/${walletAddress}/nfts?api-key=${HELIUS_API_KEY}`);
    if (!response.ok) return [];
    const data = await response.json();
    return (data.nfts || []).map((nft: any) => ({
      mint: nft.mint,
      name: nft.name || 'Credential NFT',
      uri: nft.uri || '',
      attributes: nft.attributes || [],
    }));
  } catch {
    return [];
  }
}

export async function getAssetsByOwner(walletAddress: string): Promise<any[]> {
  try {
    const response = await fetch(HELIUS_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'get-assets',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: walletAddress,
          page: 1,
          limit: 100,
          displayOptions: { showFungible: true, showNativeBalance: true },
        },
      }),
    });
    const { result } = await response.json();
    return result?.items || [];
  } catch {
    return [];
  }
}

export async function getXpFromTokenAccount(walletAddress: string): Promise<number> {
  if (!XP_MINT_DEVNET) return 0;
  return getTokenBalance(walletAddress, XP_MINT_DEVNET);
}

export async function getLeaderboardData(): Promise<Array<{ wallet: string; xp: number }>> {
  try {
    // Use Helius DAS to get all holders of the XP token and their balances
    if (!XP_MINT_DEVNET) return [];
    const response = await fetch(HELIUS_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'get-token-accounts',
        method: 'getTokenAccounts',
        params: {
          mint: XP_MINT_DEVNET,
          page: 1,
          limit: 100,
        },
      }),
    });
    const { result } = await response.json();
    const accounts = result?.token_accounts || [];
    return accounts
      .map((a: any) => ({ wallet: a.owner, xp: a.amount || 0 }))
      .sort((a: any, b: any) => b.xp - a.xp);
  } catch {
    return [];
  }
}

export async function getMultipleTokenBalances(mintAddress: string, walletAddresses: string[]): Promise<Array<{ wallet: string; balance: number }>> {
  const results = await Promise.all(
    walletAddresses.map(async (wallet) => ({
      wallet,
      balance: await getTokenBalance(wallet, mintAddress),
    }))
  );
  return results;
}
