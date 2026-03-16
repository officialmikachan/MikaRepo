'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Wallet, Shield, Zap, CheckCircle2, Copy, ArrowRightLeft, Lock, AlertCircle } from 'lucide-react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

const POOL_WALLET = process.env.NEXT_PUBLIC_POOL_WALLET!;

export default function Transfer() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

  const [activeTab, setActiveTab] = useState<'send' | 'claim'>('send');
  const [amount, setAmount] = useState('');
  const [claimCode, setClaimCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [claimedAmount, setClaimedAmount] = useState(0);
  const [claimTxSig, setClaimTxSig] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;
    try {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch {
      setBalance(null);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    if (connected) fetchBalance();
  }, [connected, fetchBalance]);

  const handleSend = async () => {
    if (!publicKey || !amount || parseFloat(amount) <= 0) return;

    setError('');
    setIsProcessing(true);
    setProcessStep(1);

    try {
      const lamports = Math.round(parseFloat(amount) * LAMPORTS_PER_SOL);
      const poolPubkey = new PublicKey(POOL_WALLET);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: poolPubkey,
          lamports,
        })
      );

      setProcessStep(2);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      setProcessStep(3);
      const res = await fetch('/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txSignature: signature,
          senderAddress: publicKey.toBase58(),
          amountLamports: lamports,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register deposit');
      }

      setGeneratedCode(data.claimCode);
      setIsSuccess(true);
      fetchBalance();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Transaction failed';
      setError(message);
    } finally {
      setIsProcessing(false);
      setProcessStep(0);
    }
  };

  const handleClaim = async () => {
    if (!publicKey || !claimCode) return;

    setError('');
    setIsProcessing(true);
    setProcessStep(4);

    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimCode: claimCode.toUpperCase(),
          claimerAddress: publicKey.toBase58(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Claim failed');
      }

      setClaimedAmount(data.amountSol);
      setClaimTxSig(data.txSignature);
      setIsSuccess(true);
      fetchBalance();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Claim failed';
      setError(message);
    } finally {
      setIsProcessing(false);
      setProcessStep(0);
    }
  };

  const resetState = () => {
    setIsSuccess(false);
    setAmount('');
    setClaimCode('');
    setGeneratedCode('');
    setProcessStep(0);
    setError('');
    setClaimedAmount(0);
    setClaimTxSig('');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortAddress = publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : '';

  return (
    <main className="min-h-screen bg-mika-bg text-mika-text font-space selection:bg-mika-accent/30 selection:text-mika-text">
      <header className="fixed top-0 left-0 right-0 z-50 bg-mika-bg/80 backdrop-blur-md border-b border-mika-accent/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-mika-text/70 hover:text-mika-accent transition-colors font-mono text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <div className="flex items-center gap-2 text-mika-accent font-mono text-xs uppercase tracking-widest border border-mika-accent/30 px-3 py-1 rounded-full bg-mika-accent/5">
            <Lock className="w-3 h-3" /> Solana Mainnet
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mika-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="text-center mb-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-mika-text uppercase mb-4">
            Private <span className="text-transparent bg-clip-text bg-gradient-to-r from-mika-accent to-pink-400 text-glow">Transfer</span>
          </h1>
          <p className="text-mika-text/70 font-mono max-w-md mx-auto">
            Send SOL to the pool and receive a claim code. Share it with anyone to let them claim the funds.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-mika-surface/80 backdrop-blur-xl border border-mika-accent/30 p-1 relative z-10"
        >
          <div className="bg-mika-bg p-6 md:p-8 h-full">
            <div className="flex border-b border-mika-text/10 mb-8">
              <button
                onClick={() => { setActiveTab('send'); resetState(); }}
                className={`flex-1 py-3 font-mono text-sm uppercase tracking-widest transition-colors relative ${activeTab === 'send' ? 'text-mika-accent font-bold' : 'text-mika-text/50 hover:text-mika-text'}`}
              >
                Send
                {activeTab === 'send' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-mika-accent box-glow" />
                )}
              </button>
              <button
                onClick={() => { setActiveTab('claim'); resetState(); }}
                className={`flex-1 py-3 font-mono text-sm uppercase tracking-widest transition-colors relative ${activeTab === 'claim' ? 'text-mika-accent font-bold' : 'text-mika-text/50 hover:text-mika-text'}`}
              >
                Claim
                {activeTab === 'claim' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-mika-accent box-glow" />
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'send' && !isSuccess && !isProcessing && (
                <motion.div
                  key="send"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {!connected ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-mika-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-mika-accent/30">
                        <Wallet className="w-8 h-8 text-mika-accent" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Connect Wallet</h3>
                      <p className="text-mika-text/60 font-mono text-sm mb-8">Connect your Solana wallet to send SOL to the pool.</p>
                      <div className="flex justify-center [&>button]:!bg-mika-accent [&>button]:!text-black [&>button]:!font-bold [&>button]:!font-mono [&>button]:!tracking-widest [&>button]:!uppercase [&>button]:!text-sm [&>button]:!rounded-none [&>button]:!h-auto [&>button]:!py-4 [&>button]:!px-8">
                        <WalletMultiButton />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-mika-surface p-3 rounded border border-mika-text/10">
                        <span className="font-mono text-xs text-mika-text/60">Connected</span>
                        <div className="flex items-center gap-2">
                          {balance !== null && (
                            <span className="font-mono text-xs text-mika-text/40">{balance.toFixed(4)} SOL</span>
                          )}
                          <span className="font-mono text-sm text-mika-accent">{shortAddress}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase tracking-widest text-mika-text/60 mb-2">Amount (SOL)</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            min="0.001"
                            step="0.001"
                            className="w-full bg-transparent border-b-2 border-mika-text/20 py-3 text-3xl font-space font-bold focus:outline-none focus:border-mika-accent transition-colors"
                          />
                          <span className="absolute right-0 bottom-4 font-mono text-mika-text/40">SOL</span>
                        </div>
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/30 p-3 rounded font-mono text-xs">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <button
                        onClick={handleSend}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="w-full py-4 mt-4 bg-mika-accent text-black font-bold font-mono tracking-widest uppercase text-sm hover:bg-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Shield className="w-4 h-4" /> Send to Pool
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'claim' && !isSuccess && !isProcessing && (
                <motion.div
                  key="claim"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {!connected ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-mika-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-mika-accent/30">
                        <Wallet className="w-8 h-8 text-mika-accent" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Connect Wallet</h3>
                      <p className="text-mika-text/60 font-mono text-sm mb-8">Connect your Solana wallet to receive funds.</p>
                      <div className="flex justify-center [&>button]:!bg-mika-accent [&>button]:!text-black [&>button]:!font-bold [&>button]:!font-mono [&>button]:!tracking-widest [&>button]:!uppercase [&>button]:!text-sm [&>button]:!rounded-none [&>button]:!h-auto [&>button]:!py-4 [&>button]:!px-8">
                        <WalletMultiButton />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-mika-surface p-3 rounded border border-mika-text/10">
                        <span className="font-mono text-xs text-mika-text/60">Receiving to</span>
                        <span className="font-mono text-sm text-mika-accent">{shortAddress}</span>
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase tracking-widest text-mika-text/60 mb-2">Claim Code</label>
                        <input
                          type="text"
                          value={claimCode}
                          onChange={(e) => setClaimCode(e.target.value.toUpperCase())}
                          placeholder="MIKA-XXXX-XXXX"
                          className="w-full bg-mika-surface border border-mika-text/20 p-4 font-mono text-center tracking-widest focus:outline-none focus:border-mika-accent transition-colors uppercase"
                        />
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/30 p-3 rounded font-mono text-xs">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <button
                        onClick={handleClaim}
                        disabled={!claimCode || claimCode.length < 10}
                        className="w-full py-4 mt-4 bg-mika-accent text-black font-bold font-mono tracking-widest uppercase text-sm hover:bg-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" /> Claim Funds
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {isProcessing && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  <div className="relative w-24 h-24 mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-dashed border-mika-accent rounded-full"
                    ></motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {processStep <= 2 ? (
                        <Shield className="w-8 h-8 text-mika-accent animate-pulse" />
                      ) : (
                        <ArrowRightLeft className="w-8 h-8 text-mika-accent animate-pulse" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-space font-bold text-xl mb-2">
                    {processStep === 1 && "Creating Transaction..."}
                    {processStep === 2 && "Awaiting Wallet Approval..."}
                    {processStep === 3 && "Verifying Deposit..."}
                    {processStep === 4 && "Processing Claim..."}
                  </h3>
                  <p className="font-mono text-sm text-mika-text/50">
                    Please do not close this window.
                  </p>
                </motion.div>
              )}

              {isSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>

                  <h3 className="font-space font-bold text-2xl mb-2">
                    {activeTab === 'send' ? 'SOL Deposited!' : 'Claim Successful!'}
                  </h3>

                  {activeTab === 'send' ? (
                    <>
                      <p className="font-mono text-sm text-mika-text/70 mb-8">
                        Share this code with the recipient. They can claim it anytime.
                      </p>

                      <div className="w-full bg-mika-surface border border-mika-accent/50 p-4 rounded-lg mb-8 relative group">
                        <div className="font-mono text-xl tracking-widest text-mika-accent font-bold">
                          {generatedCode}
                        </div>
                        <button
                          onClick={() => handleCopy(generatedCode)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-mika-text/50 hover:text-mika-accent transition-colors"
                          title="Copy Code"
                        >
                          {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-mono text-sm text-mika-text/70 mb-4">
                        {claimedAmount.toFixed(4)} SOL has been sent to your wallet.
                      </p>
                      {claimTxSig && (
                        <a
                          href={`https://explorer.solana.com/tx/${claimTxSig}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-mika-accent hover:underline mb-8 inline-block"
                        >
                          View on Explorer →
                        </a>
                      )}
                    </>
                  )}

                  <button
                    onClick={resetState}
                    className="px-8 py-3 bg-transparent border border-mika-text/20 hover:border-mika-accent hover:text-mika-accent transition-colors font-mono text-sm uppercase tracking-widest mt-4"
                  >
                    {activeTab === 'send' ? 'Send Another' : 'Claim Another'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
