import { NextRequest, NextResponse } from 'next/server';
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import bs58 from 'bs58';
import pool from '@/lib/db';

const SOLANA_RPC = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

function getPoolKeypair(): Keypair {
  const secret = process.env.POOL_WALLET_SECRET;
  if (!secret) throw new Error('Pool wallet not configured');
  return Keypair.fromSecretKey(bs58.decode(secret));
}

export async function POST(req: NextRequest) {
  const client = await pool.connect();
  try {
    const { claimCode, claimerAddress } = await req.json();

    if (!claimCode || !claimerAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let claimerPubkey: PublicKey;
    try {
      claimerPubkey = new PublicKey(claimerAddress);
    } catch {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
    }

    await client.query('BEGIN');

    const result = await client.query(
      `UPDATE deposits SET status = 'claiming', claimer_address = $1, claimed_at = NOW()
       WHERE claim_code = $2 AND status = 'active'
       RETURNING *`,
      [claimerAddress, claimCode.toUpperCase()]
    );

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ error: 'Invalid or already claimed code' }, { status: 400 });
    }

    const deposit = result.rows[0];
    const sendAmount = Number(deposit.amount_lamports);

    const connection = new Connection(SOLANA_RPC, 'confirmed');
    const poolKeypair = getPoolKeypair();

    const poolBalance = await connection.getBalance(poolKeypair.publicKey);
    const fee = 10000;

    if (poolBalance < sendAmount + fee) {
      await client.query(
        `UPDATE deposits SET status = 'active', claimer_address = NULL, claimed_at = NULL WHERE claim_code = $1`,
        [claimCode.toUpperCase()]
      );
      await client.query('COMMIT');
      return NextResponse.json({ error: 'Insufficient pool balance. Please try again later.' }, { status: 503 });
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: poolKeypair.publicKey,
        toPubkey: claimerPubkey,
        lamports: sendAmount,
      })
    );

    let claimTxSignature: string;
    try {
      claimTxSignature = await sendAndConfirmTransaction(connection, transaction, [poolKeypair]);
    } catch (txErr) {
      await client.query(
        `UPDATE deposits SET status = 'active', claimer_address = NULL, claimed_at = NULL WHERE claim_code = $1`,
        [claimCode.toUpperCase()]
      );
      await client.query('COMMIT');
      throw txErr;
    }

    await client.query(
      `UPDATE deposits SET status = 'claimed', claim_tx_signature = $1 WHERE claim_code = $2`,
      [claimTxSignature, claimCode.toUpperCase()]
    );

    await client.query('COMMIT');

    return NextResponse.json({
      success: true,
      txSignature: claimTxSignature,
      amountSol: sendAmount / LAMPORTS_PER_SOL,
    });
  } catch (error: unknown) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Claim error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    client.release();
  }
}
