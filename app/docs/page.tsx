import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Book, Code, Terminal, Zap, Bot, Radio, Shield, ArrowRight } from 'lucide-react';

export default function Documentation() {
  return (
    <main className="min-h-screen bg-mika-bg text-mika-text font-space selection:bg-mika-accent/30 selection:text-mika-text pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-mika-bg/80 backdrop-blur-md border-b border-mika-accent/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-mika-text/70 hover:text-mika-accent transition-colors font-mono text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-mika-accent font-mono text-xs uppercase tracking-widest border border-mika-accent/30 px-3 py-1 rounded-full bg-mika-accent/5">
            <Book className="w-3 h-3" /> Docs v1.2
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-6 pt-32 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32">
            <h3 className="font-space font-bold text-mika-text uppercase tracking-widest mb-6">Getting Started</h3>
            <ul className="space-y-3 font-mono text-sm mb-10">
              <li><a href="#introduction" className="text-mika-accent hover:text-mika-accent transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-mika-accent"></div> Introduction</a></li>
              <li><a href="#quickstart" className="text-mika-text/60 hover:text-mika-accent transition-colors">Quickstart Guide</a></li>
              <li><a href="#installation" className="text-mika-text/60 hover:text-mika-accent transition-colors">Installation</a></li>
            </ul>

            <h3 className="font-space font-bold text-mika-text uppercase tracking-widest mb-6">Core Concepts</h3>
            <ul className="space-y-3 font-mono text-sm mb-10">
              <li><a href="#zk-nfc" className="text-mika-text/60 hover:text-mika-accent transition-colors">ZK-NFC Integration</a></li>
              <li><a href="#x402" className="text-mika-text/60 hover:text-mika-accent transition-colors">x402 Offline Settlement</a></li>
              <li><a href="#smart-contracts" className="text-mika-text/60 hover:text-mika-accent transition-colors">Smart Contracts</a></li>
            </ul>

            <h3 className="font-space font-bold text-mika-text uppercase tracking-widest mb-6">OpenClaw</h3>
            <ul className="space-y-3 font-mono text-sm mb-10">
              <li><a href="#openclaw-overview" className="text-mika-text/60 hover:text-mika-accent transition-colors">What is OpenClaw?</a></li>
              <li><a href="#openclaw-architecture" className="text-mika-text/60 hover:text-mika-accent transition-colors">Architecture</a></li>
              <li><a href="#openclaw-agent" className="text-mika-text/60 hover:text-mika-accent transition-colors">AI Payment Agent</a></li>
              <li><a href="#openclaw-integration" className="text-mika-text/60 hover:text-mika-accent transition-colors">Integration Guide</a></li>
            </ul>

            <h3 className="font-space font-bold text-mika-text uppercase tracking-widest mb-6">API Reference</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li><a href="#rest-api" className="text-mika-text/60 hover:text-mika-accent transition-colors">REST API</a></li>
              <li><a href="#sdk" className="text-mika-text/60 hover:text-mika-accent transition-colors">JavaScript SDK</a></li>
              <li><a href="#errors" className="text-mika-text/60 hover:text-mika-accent transition-colors">Error Codes</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <article className="flex-1 max-w-3xl">
          <div className="mb-16 border-b border-mika-text/10 pb-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-mika-text uppercase mb-6 leading-tight">
              Mikachan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mika-accent to-pink-400 text-glow">
                Developer Docs
              </span>
            </h1>
            <p className="text-xl text-mika-text/70 font-mono leading-relaxed">
              Everything you need to integrate private, offline-ready tap-to-pay into your Web3 application.
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none font-mono text-mika-text/80">
            
            <section className="mb-16" id="introduction">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-mika-accent" /> Introduction
              </h2>
              <p className="mb-6 leading-relaxed">
                Welcome to the Mikachan developer documentation. Mikachan is a decentralized protocol designed to bridge the gap between digital Web3 assets and physical point-of-sale (POS) systems.
              </p>
              <p className="leading-relaxed">
                By utilizing Zero-Knowledge Proofs (zk-SNARKs) over standard Near Field Communication (NFC), Mikachan enables secure, private, and offline-capable tap-to-pay transactions.
              </p>
            </section>

            <section className="mb-16" id="quickstart">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-mika-accent" /> Quickstart Guide
              </h2>
              <p className="mb-6 leading-relaxed">
                Get up and running with the Mikachan SDK in minutes. First, install the package via npm or yarn:
              </p>
              
              <div className="bg-mika-surface border border-mika-text/10 rounded-lg p-4 mb-6 relative group">
                <div className="absolute top-0 right-0 px-3 py-1 bg-mika-text/5 text-mika-text/50 text-xs border-b border-l border-mika-text/10 rounded-bl-lg">bash</div>
                <code className="text-mika-accent">npm install @mikachan/sdk</code>
              </div>

              <p className="mb-6 leading-relaxed">
                Initialize the client with your API key and preferred network:
              </p>

              <div className="bg-mika-surface border border-mika-text/10 rounded-lg p-4 mb-6 relative overflow-x-auto">
                <div className="absolute top-0 right-0 px-3 py-1 bg-mika-text/5 text-mika-text/50 text-xs border-b border-l border-mika-text/10 rounded-bl-lg">typescript</div>
                <pre className="text-sm text-mika-text/80 mt-4">
<span className="text-pink-500">import</span> {'{'} MikachanClient {'}'} <span className="text-pink-500">from</span> <span className="text-green-500">'@mikachan/sdk'</span>;{'\n\n'}
<span className="text-pink-500">const</span> client = <span className="text-pink-500">new</span> MikachanClient({'{'}{'\n'}
{'  '}apiKey: process.env.MIKACHAN_API_KEY,{'\n'}
{'  '}network: <span className="text-green-500">'mainnet'</span>,{'\n'}
{'  '}environment: <span className="text-green-500">'production'</span>{'\n'}
{'}'});{'\n\n'}
<span className="text-mika-text/50">// Initialize the NFC listener</span>{'\n'}
<span className="text-pink-500">await</span> client.startNfcListener();
                </pre>
              </div>
            </section>

            <section className="mb-16" id="zk-nfc">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-mika-accent" /> ZK-NFC Integration
              </h2>
              <p className="mb-6 leading-relaxed">
                The core of Mikachan's privacy lies in its ZK-NFC payload. When a user taps their device, the SDK automatically generates a zk-SNARK proof asserting that the user has sufficient funds and controls the necessary private keys, without revealing the actual address or balance.
              </p>
              <div className="border-l-2 border-mika-accent pl-6 py-2 my-8">
                <p className="text-mika-text italic">
                  Note: Proof generation happens locally on the user's device within a secure enclave (if available) or via highly optimized WebAssembly modules.
                </p>
              </div>
              <p className="leading-relaxed">
                As a merchant integrator, you only need to listen for the `onPaymentReceived` event, which guarantees the proof has been cryptographically verified by the SDK.
              </p>
            </section>

            <section className="mb-16" id="x402">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-mika-accent" /> x402 Offline Settlement
              </h2>
              <p className="mb-6 leading-relaxed">
                The x402 protocol allows transactions to be buffered locally when the merchant terminal is offline. The SDK handles the queuing and optimistic verification of ZK-proofs.
              </p>
              <p className="leading-relaxed">
                Once internet connectivity is restored, the SDK automatically flushes the queue, settling all buffered transactions on-chain. You can monitor the queue status using the `client.getQueueStatus()` method.
              </p>
            </section>

            <section className="mb-16" id="smart-contracts">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-mika-accent" /> Smart Contracts
              </h2>
              <p className="mb-6 leading-relaxed">
                Mikachan's smart contracts are deployed on multiple EVM-compatible networks. They handle the final verification of ZK-proofs and the state transitions for the shielded pool.
              </p>
              <p className="leading-relaxed">
                For direct contract interactions, refer to our ABI documentation and deployed contract addresses in the developer portal.
              </p>
            </section>

            {/* ── OpenClaw sections ── */}
            <section className="mb-16" id="openclaw-overview">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Image src="/openclaw-logo.png" alt="OpenClaw" width={28} height={28} className="object-contain" />
                What is OpenClaw?
              </h2>
              <p className="mb-6 leading-relaxed">
                OpenClaw is an autonomous AI payment agent layer built on top of Mikachan's Solana infrastructure. It allows natural-language payment commands to be parsed, validated, and executed on-chain — without the user needing to manually enter wallet addresses or amounts.
              </p>
              <p className="mb-6 leading-relaxed">
                Instead of a traditional payment UI, OpenClaw accepts instructions like <code className="text-mika-accent">"Send 0.1 SOL to Alice for dinner"</code> and handles the full payment flow: parsing intent, confirming with the user, and submitting a signed transaction to Solana Mainnet.
              </p>
              <div className="border-l-2 border-purple-400 pl-6 py-2 my-8 bg-purple-400/5 rounded-r-lg">
                <p className="text-mika-text">
                  OpenClaw is designed for autonomous commerce — IoT devices, agents, and merchant terminals that need to make or receive payments without human interaction at every step.
                </p>
              </div>
              <p className="leading-relaxed">
                The <Link href="/openclaw" className="text-mika-accent hover:underline">OpenClaw integration page</Link> describes the full concept and use cases. The <Link href="/agent" className="text-mika-accent hover:underline">AI Agent</Link> is the live implementation you can try today.
              </p>
            </section>

            <section className="mb-16" id="openclaw-architecture">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Radio className="w-6 h-6 text-purple-400" /> Architecture
              </h2>
              <p className="mb-6 leading-relaxed">
                The OpenClaw stack sits between the user/device and the Solana network. It has three layers:
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { step: '01', title: 'Natural Language Input', desc: 'The user or autonomous agent sends a text command. OpenClaw accepts English, Malay, or any language the underlying model supports.' },
                  { step: '02', title: 'Intent Parsing (GPT-4o)', desc: 'The command is sent to the /api/agent endpoint, which calls OpenAI to extract a structured payment intent — action, amount, currency, recipient, and description.' },
                  { step: '03', title: 'Confirmation Gate', desc: 'If the intent is complete, a payment card is rendered for user confirmation. If information is missing, the agent asks a follow-up question.' },
                  { step: '04', title: 'On-chain Execution', desc: 'After confirmation, the user\'s connected wallet signs a Solana SystemProgram.transfer transaction. The signature is confirmed on Mainnet and displayed with a Solscan link.' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4 p-4 bg-mika-surface border border-mika-text/10 rounded-xl">
                    <span className="font-space font-black text-2xl text-purple-400/40 shrink-0 w-10">{step}</span>
                    <div>
                      <p className="font-bold text-mika-text mb-1">{title}</p>
                      <p className="text-mika-text/60 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-wrap font-mono text-xs text-mika-text/50">
                {['User / Device', 'OpenClaw Agent', 'Mikachan SDK', 'ZK-NFC Intent', 'x402 Settlement', 'Solana Mainnet'].map((node, i, arr) => (
                  <span key={node} className="flex items-center gap-3">
                    <span className="px-3 py-1 border border-purple-400/30 rounded-full text-purple-300">{node}</span>
                    {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-mika-text/30" />}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-16" id="openclaw-agent">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Bot className="w-6 h-6 text-purple-400" /> AI Payment Agent
              </h2>
              <p className="mb-6 leading-relaxed">
                The live AI Payment Agent is available at <Link href="/agent" className="text-mika-accent hover:underline">/agent</Link>. It is powered by a Next.js API route (<code className="text-mika-accent">/api/agent</code>) that wraps OpenAI's chat completions API using the Replit AI integration.
              </p>
              <p className="mb-6 leading-relaxed">
                The agent parses commands into a structured JSON object. When the intent is complete, a confirmation card is shown before any funds move. The transfer itself is executed client-side by the user's Solana wallet — the server never holds private keys.
              </p>

              <div className="bg-mika-surface border border-mika-text/10 rounded-lg p-4 mb-6 relative overflow-x-auto">
                <div className="absolute top-0 right-0 px-3 py-1 bg-mika-text/5 text-mika-text/50 text-xs border-b border-l border-mika-text/10 rounded-bl-lg">json — agent response</div>
                <pre className="text-sm text-mika-text/80 mt-4">{`{
  "action": "send",
  "amount": 0.05,
  "currency": "SOL",
  "recipient": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "description": "coffee",
  "clarification_needed": null,
  "message": "Ready to send 0.05 SOL for coffee. Confirm to proceed."
}`}</pre>
              </div>

              <p className="leading-relaxed">
                Example commands the agent understands:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 mt-4 text-mika-text/70">
                <li><code className="text-mika-accent">"Send 0.1 SOL to 7xKX..."</code> — immediate send intent with full details</li>
                <li><code className="text-mika-accent">"Pay 0.005 SOL for coffee"</code> — agent asks for recipient address</li>
                <li><code className="text-mika-accent">"What is my wallet balance?"</code> — balance query intent</li>
                <li><code className="text-mika-accent">"Transfer 0.02 SOL to my friend Alice"</code> — agent asks for wallet address</li>
              </ul>
            </section>

            <section className="mb-16" id="openclaw-integration">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-400" /> Integration Guide
              </h2>
              <p className="mb-6 leading-relaxed">
                To add OpenClaw's agent API to your own application, call the <code className="text-mika-accent">/api/agent</code> endpoint with a POST request:
              </p>
              <div className="bg-mika-surface border border-mika-text/10 rounded-lg p-4 mb-6 relative overflow-x-auto">
                <div className="absolute top-0 right-0 px-3 py-1 bg-mika-text/5 text-mika-text/50 text-xs border-b border-l border-mika-text/10 rounded-bl-lg">typescript</div>
                <pre className="text-sm text-mika-text/80 mt-4">{`const response = await fetch('/api/agent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Send 0.01 SOL to 7xKX... for coffee',
    history: [] // previous messages for multi-turn context
  }),
});

const intent = await response.json();
// intent.action === 'send'
// intent.amount === 0.01
// intent.recipient === '7xKX...'`}</pre>
              </div>
              <p className="mb-6 leading-relaxed">
                Once you have a complete intent (no <code className="text-mika-accent">clarification_needed</code>), build and send the Solana transaction using the wallet adapter:
              </p>
              <div className="bg-mika-surface border border-mika-text/10 rounded-lg p-4 mb-6 relative overflow-x-auto">
                <div className="absolute top-0 right-0 px-3 py-1 bg-mika-text/5 text-mika-text/50 text-xs border-b border-l border-mika-text/10 rounded-bl-lg">typescript</div>
                <pre className="text-sm text-mika-text/80 mt-4">{`import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

const tx = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: new PublicKey(intent.recipient),
    lamports: Math.round(intent.amount * LAMPORTS_PER_SOL),
  })
);

const signature = await sendTransaction(tx, connection);
await connection.confirmTransaction(signature, 'confirmed');`}</pre>
              </div>
              <div className="border-l-2 border-purple-400 pl-6 py-2 my-8 bg-purple-400/5 rounded-r-lg">
                <p className="text-mika-text">
                  The server never touches private keys. All transaction signing happens in the user's wallet (Phantom, Solflare, etc.) on the client side. OpenClaw only parses intent — execution authority stays with the user.
                </p>
              </div>
            </section>

            <section className="mb-16" id="rest-api">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-mika-accent" /> REST API
              </h2>
              <p className="mb-6 leading-relaxed">
                While the SDK is the recommended way to integrate Mikachan, we also provide a REST API for backend services that need to query transaction status, retrieve historical data, or manage merchant accounts.
              </p>
              <div className="bg-mika-surface border border-mika-text/10 rounded-lg p-4 mb-6 relative overflow-x-auto">
                <div className="absolute top-0 right-0 px-3 py-1 bg-mika-text/5 text-mika-text/50 text-xs border-b border-l border-mika-text/10 rounded-bl-lg">http</div>
                <pre className="text-sm text-mika-text/80 mt-4">
GET /v1/transactions/status?id=tx_12345
Authorization: Bearer YOUR_API_KEY
                </pre>
              </div>
            </section>

            <section className="mb-16" id="sdk">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-mika-accent" /> JavaScript SDK
              </h2>
              <p className="mb-6 leading-relaxed">
                The `@mikachan/sdk` provides a comprehensive set of tools for both Node.js and browser environments. It includes built-in support for NFC hardware abstraction, ZK-proof generation, and x402 queue management.
              </p>
              <p className="leading-relaxed">
                Full API reference for the SDK classes and methods is available in our typedoc generated documentation.
              </p>
            </section>

            <section className="mb-16" id="errors">
              <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-mika-accent" /> Error Codes
              </h2>
              <p className="mb-6 leading-relaxed">
                When an operation fails, the Mikachan API and SDK return standardized error codes to help you diagnose the issue.
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-mika-text/70">
                <li><code className="text-mika-accent">ERR_INSUFFICIENT_FUNDS</code>: The user's shielded balance is too low.</li>
                <li><code className="text-mika-accent">ERR_INVALID_PROOF</code>: The provided ZK-proof failed cryptographic verification.</li>
                <li><code className="text-mika-accent">ERR_NFC_TIMEOUT</code>: The NFC connection was lost before the payload was fully transmitted.</li>
                <li><code className="text-mika-accent">ERR_DOUBLE_SPEND</code>: The nullifier has already been used.</li>
              </ul>
            </section>

          </div>
        </article>
      </div>
    </main>
  );
}
