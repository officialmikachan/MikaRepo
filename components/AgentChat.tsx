'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Send, Bot, User, Wallet, CheckCircle2,
  Zap, AlertCircle, Loader2, RefreshCw, Info, Twitter
} from 'lucide-react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import Image from 'next/image';

interface ParsedIntent {
  action: 'send' | 'check_balance' | 'unknown';
  amount: number | null;
  currency: string | null;
  recipient: string | null;
  description: string | null;
  clarification_needed: string | null;
  message: string;
}

interface ChatMessage {
  role: 'user' | 'agent';
  content: string;
  intent?: ParsedIntent;
  timestamp: number;
}

const EXAMPLE_COMMANDS = [
  'Send 0.01 SOL to 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  'Pay 0.005 SOL for coffee',
  'What is my wallet balance?',
  'Transfer 0.02 SOL to my friend',
];

export default function AgentChat() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'agent',
    content: '',
    intent: {
      action: 'unknown',
      amount: null,
      currency: null,
      recipient: null,
      description: null,
      clarification_needed: null,
      message: "Hi! I'm MikaAgent. Tell me what payment you want to make — for example: \"Send 0.01 SOL to [address]\" or \"Pay 0.005 SOL for coffee\".",
    },
    timestamp: Date.now(),
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingIntent, setPendingIntent] = useState<ParsedIntent | null>(null);
  const [txState, setTxState] = useState<'idle' | 'signing' | 'sending' | 'success' | 'error'>('idle');
  const [txSig, setTxSig] = useState('');
  const [txError, setTxError] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, pendingIntent]);

  const buildHistory = () =>
    messages
      .filter(m => m.role !== 'agent' || m.content)
      .map(m => ({ role: m.role === 'agent' ? 'assistant' : 'user', content: m.content || m.intent?.message || '' }));

  const sendMessage = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || isLoading) return;

    setInput('');
    setPendingIntent(null);
    setTxState('idle');
    setTxSig('');
    setTxError('');

    const userMsg: ChatMessage = { role: 'user', content: msg, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: buildHistory() }),
      });
      const intent: ParsedIntent = await res.json();

      const agentMsg: ChatMessage = {
        role: 'agent',
        content: intent.message,
        intent,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, agentMsg]);

      if (intent.action === 'send' && intent.amount && intent.recipient && !intent.clarification_needed) {
        setPendingIntent(intent);
      }

      if (intent.action === 'check_balance') {
        await fetchBalance();
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'agent',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const executePayment = async () => {
    if (!pendingIntent?.amount || !pendingIntent.recipient || !publicKey) return;

    setTxState('signing');
    setTxError('');

    try {
      const lamports = Math.round(pendingIntent.amount * LAMPORTS_PER_SOL);
      const recipientPubkey = new PublicKey(pendingIntent.recipient);

      const { blockhash } = await connection.getLatestBlockhash('confirmed');
      const transaction = new Transaction().add(
        SystemProgram.transfer({ fromPubkey: publicKey, toPubkey: recipientPubkey, lamports })
      );
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      setTxState('sending');
      const sig = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(sig, 'confirmed');

      setTxSig(sig);
      setTxState('success');
      setPendingIntent(null);
      await fetchBalance();

      setMessages(prev => [...prev, {
        role: 'agent',
        content: '',
        intent: {
          action: 'unknown',
          amount: null,
          currency: null,
          recipient: null,
          description: null,
          clarification_needed: null,
          message: `✓ Payment sent! ${pendingIntent.amount} SOL${pendingIntent.description ? ` for "${pendingIntent.description}"` : ''} — confirmed on Solana.`,
        },
        timestamp: Date.now(),
      }]);
    } catch (err: unknown) {
      setTxState('error');
      const msg = err instanceof Error ? err.message : 'Transaction failed';
      setTxError(msg.length > 120 ? msg.slice(0, 120) + '...' : msg);
    }
  };

  return (
    <main className="min-h-screen bg-mika-bg text-mika-text font-space flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-mika-bg/80 backdrop-blur-md border-b border-mika-accent/20 py-3 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-mika-text/50 hover:text-mika-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </a>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-mika-accent to-violet-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold tracking-tight">MikaAgent</span>
              <span className="font-mono text-xs border border-mika-accent/30 text-mika-accent px-2 py-0.5 rounded-full">AI Payment Agent</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {connected && balance !== null && (
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-mika-text/60 border border-mika-text/10 px-3 py-1.5 rounded-full">
                <Wallet className="w-3 h-3" />
                {balance.toFixed(4)} SOL
                <button onClick={fetchBalance} className="ml-1 hover:text-mika-accent transition-colors">
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            )}
            <WalletMultiButton style={{
              background: 'var(--color-mika-accent)',
              color: '#000',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              borderRadius: '0',
              height: '36px',
              padding: '0 16px',
            }} />
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 pt-24 pb-44 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === 'agent'
                    ? 'bg-gradient-to-br from-mika-accent to-violet-500'
                    : 'bg-mika-surface border border-mika-text/10'
                }`}>
                  {msg.role === 'agent'
                    ? <Bot className="w-4 h-4 text-white" />
                    : <User className="w-4 h-4 text-mika-text/60" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-mika-accent text-black font-medium rounded-tr-sm'
                      : 'bg-mika-surface border border-mika-text/10 rounded-tl-sm'
                  }`}>
                    {msg.content || msg.intent?.message}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mika-accent to-violet-500 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-mika-surface border border-mika-text/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-mika-accent"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Balance card */}
            {connected && balance !== null && messages.some(m => m.intent?.action === 'check_balance') && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-11 bg-mika-surface border border-mika-accent/30 rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 mb-1 text-xs font-mono text-mika-text/50 uppercase tracking-widest">
                  <Wallet className="w-3 h-3" /> Your Wallet Balance
                </div>
                <div className="text-3xl font-black tracking-tighter">
                  {balance.toFixed(6)} <span className="text-mika-accent text-xl">SOL</span>
                </div>
                <div className="text-xs font-mono text-mika-text/40 mt-1 break-all">{publicKey?.toBase58()}</div>
              </motion.div>
            )}

            {/* Payment confirmation card */}
            {pendingIntent && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="ml-11 bg-mika-bg border border-mika-accent/40 rounded-2xl overflow-hidden"
              >
                <div className="bg-mika-accent/10 border-b border-mika-accent/20 px-5 py-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-mika-accent" />
                  <span className="font-mono text-sm font-bold text-mika-accent uppercase tracking-widest">Payment Intent</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-mika-text/50">Amount</span>
                    <span className="font-black text-xl tracking-tighter">
                      {pendingIntent.amount} <span className="text-mika-accent">SOL</span>
                    </span>
                  </div>
                  {pendingIntent.description && (
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-mika-text/50">For</span>
                      <span className="font-mono text-sm">{pendingIntent.description}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-mika-text/50">Recipient</span>
                    <span className="font-mono text-xs break-all text-mika-text/80 bg-mika-surface px-3 py-2 rounded-lg">{pendingIntent.recipient}</span>
                  </div>

                  {!connected ? (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-3">
                        <Info className="w-3.5 h-3.5" /> Connect your wallet to send
                      </div>
                      <WalletMultiButton style={{
                        width: '100%',
                        background: 'var(--color-mika-accent)',
                        color: '#000',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.05em',
                        borderRadius: '0',
                        height: '44px',
                        justifyContent: 'center',
                      }} />
                    </div>
                  ) : (
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={executePayment}
                        disabled={txState === 'signing' || txState === 'sending'}
                        className="flex-1 bg-mika-accent text-black font-bold font-mono text-sm uppercase tracking-widest py-3 hover:bg-pink-500 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {txState === 'signing' && <><Loader2 className="w-4 h-4 animate-spin" /> Signing...</>}
                        {txState === 'sending' && <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>}
                        {txState === 'idle' && <><CheckCircle2 className="w-4 h-4" /> Confirm & Send</>}
                        {txState === 'error' && <><CheckCircle2 className="w-4 h-4" /> Retry</>}
                      </button>
                      <button
                        onClick={() => setPendingIntent(null)}
                        className="px-4 border border-mika-text/20 text-mika-text/60 hover:border-mika-accent hover:text-mika-accent transition-colors font-mono text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {txError && (
                    <div className="flex items-start gap-2 text-xs font-mono text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{txError}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Success banner */}
            {txState === 'success' && txSig && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-11 bg-green-400/10 border border-green-400/30 rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <div>
                  <div className="font-mono text-sm font-bold text-green-400">Transaction Confirmed!</div>
                  <a
                    href={`https://solscan.io/tx/${txSig}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-mika-text/40 hover:text-mika-accent transition-colors underline"
                  >
                    View on Solscan →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 left-0 right-0 bg-mika-bg/90 backdrop-blur-md border-t border-mika-text/10 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          {/* Example chips */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
            {EXAMPLE_COMMANDS.map((cmd, i) => (
              <button
                key={i}
                onClick={() => sendMessage(cmd)}
                disabled={isLoading}
                className="shrink-0 font-mono text-xs border border-mika-text/15 text-mika-text/50 px-3 py-1.5 rounded-full hover:border-mika-accent hover:text-mika-accent transition-colors disabled:opacity-40 whitespace-nowrap"
              >
                {cmd.length > 40 ? cmd.slice(0, 40) + '…' : cmd}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-mika-surface border border-mika-text/15 focus-within:border-mika-accent transition-colors px-4 py-3 rounded-xl">
              <Image src="/logo.jpg" alt="Mika" width={20} height={20} className="rounded-full shrink-0 opacity-60" />
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="e.g. Send 0.01 SOL to [address]..."
                className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-mika-text/30"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 bg-mika-accent text-black flex items-center justify-center hover:bg-pink-500 transition-colors disabled:opacity-40"
            >
              {isLoading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Send className="w-4 h-4" />
              }
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-mono text-xs text-mika-text/30">
              AI-powered · Solana Mainnet · Real transactions
            </p>
            <a href="https://x.com/mikachanos?s=21" target="_blank" rel="noopener noreferrer" className="text-mika-text/30 hover:text-mika-accent transition-colors">
              <Twitter className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
