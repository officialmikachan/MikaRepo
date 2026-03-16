import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import pool from '@/lib/db';
import crypto from 'crypto';

const SOLANA_RPC = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const POOL_WALLET = process.env.NEXT_PUBLIC_POOL_WALLET!;

function generateClaimCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg1 = Array.from(crypto.randomBytes(4)).map(b => chars[b % chars.length]).join('');
  const seg2 = Array.from(crypto.randomBytes(4)).map(b => chars[b % chars.length]).join('');
  return `MIKA-${seg1}-${seg2}`;
}

export async function POST(req: NextRequest) {
  try {
    const { txSignature, senderAddress, amountLamports } = await req.json();

    if (!txSignature || !senderAddress || !amountLamports) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const connection = new Connection(SOLANA_RPC, 'confirmed');

    const tx = await connection.getTransaction(txSignature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0,
    });

    if (!tx || tx.meta?.err) {
      return NextResponse.json({ error: 'Transaction not found or failed' }, { status: 400 });
    }

    const message = tx.transaction.message;
    const accountKeys = message.getAccountKeys();
    const compiledInstructions = message.compiledInstructions;

    let verifiedAmount = 0;

    for (const ix of compiledInstructions) {
      const programId = accountKeys.get(ix.programIdIndex);
      if (!programId || !programId.equals(SystemProgram.programId)) continue;

      if (ix.data[0] !== 2) continue;

      const fromKey = accountKeys.get(ix.accountKeyIndexes[0]);
      const toKey = accountKeys.get(ix.accountKeyIndexes[1]);

      if (!fromKey || !toKey) continue;
      if (fromKey.toBase58() !== senderAddress) continue;
      if (toKey.toBase58() !== POOL_WALLET) continue;

      const dataView = new DataView(ix.data.buffer, ix.data.byteOffset, ix.data.byteLength);
      const lamports = dataView.getBigUint64(4, true);
      verifiedAmount += Number(lamports);
    }

    if (verifiedAmount < amountLamports * 0.99) {
      return NextResponse.json({ error: 'Could not verify transfer to pool wallet from sender' }, { status: 400 });
    }

    const existing = await pool.query(
      'SELECT id FROM deposits WHERE tx_signature = $1',
      [txSignature]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Transaction already processed' }, { status: 400 });
    }

    let claimCode: string;
    let attempts = 0;
    do {
      claimCode = generateClaimCode();
      const dup = await pool.query('SELECT id FROM deposits WHERE claim_code = $1', [claimCode]);
      if (dup.rows.length === 0) break;
      attempts++;
    } while (attempts < 10);

    await pool.query(
      `INSERT INTO deposits (claim_code, amount_lamports, sender_address, tx_signature, status)
       VALUES ($1, $2, $3, $4, 'active')`,
      [claimCode, verifiedAmount, senderAddress, txSignature]
    );

    return NextResponse.json({
      claimCode,
      amountSol: verifiedAmount / LAMPORTS_PER_SOL,
    });
  } catch (error: unknown) {
    console.error('Deposit error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
