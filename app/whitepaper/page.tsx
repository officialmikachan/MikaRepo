import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Zap, Cpu } from 'lucide-react';

export default function Whitepaper() {
  return (
    <main className="min-h-screen bg-mika-bg text-mika-text font-space selection:bg-mika-accent/30 selection:text-mika-text pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-mika-bg/80 backdrop-blur-md border-b border-mika-accent/20 py-4">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-mika-text/70 hover:text-mika-accent transition-colors font-mono text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-mika-accent font-mono text-xs uppercase tracking-widest border border-mika-accent/30 px-3 py-1 rounded-full bg-mika-accent/5">
            <FileText className="w-3 h-3" /> v1.0.0
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 pt-32">
        <div className="mb-16 border-b border-mika-text/10 pb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-mika-text uppercase mb-6 leading-tight">
            Mikachan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mika-accent to-pink-400 text-glow">
              Protocol Whitepaper
            </span>
          </h1>
          <p className="text-xl text-mika-text/70 font-mono leading-relaxed">
            A decentralized architecture for private, offline-ready physical payments utilizing Zero-Knowledge Proofs over NFC and x402-secured settlement.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none font-mono text-mika-text/80">
          <section className="mb-16" id="abstract">
            <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="text-mika-accent">01.</span> Abstract
            </h2>
            <p className="mb-6 leading-relaxed">
              The current landscape of physical payments is heavily reliant on centralized intermediaries, constant internet connectivity, and the exposure of sensitive user data. While Web3 has revolutionized digital transactions, bridging the gap to physical point-of-sale (POS) systems remains a significant challenge.
            </p>
            <p className="leading-relaxed">
              Mikachan introduces a novel protocol that enables secure, private, and offline-capable tap-to-pay transactions for decentralized assets. By combining Zero-Knowledge (ZK) proofs with Near Field Communication (NFC) and leveraging the x402 settlement standard, Mikachan allows users to prove payment capability and authorize transfers without revealing their identity, balance, or requiring immediate network access.
            </p>
          </section>

          <section className="mb-16" id="architecture">
            <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="text-mika-accent">02.</span> ZK-NFC Architecture
              <Shield className="w-6 h-6 text-mika-accent" />
            </h2>
            <p className="mb-6 leading-relaxed">
              At the core of Mikachan is the integration of zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) into the standard NFC transmission payload.
            </p>
            <div className="bg-mika-bg/50 border border-mika-text/10 p-6 rounded-lg mb-6 font-mono text-sm">
              <h4 className="text-mika-text mb-2 uppercase tracking-widest text-xs">The Proof Generation Process:</h4>
              <ol className="list-decimal list-inside space-y-2 text-mika-text/70">
                <li>User initiates a payment intent on their mobile device.</li>
                <li>The local secure enclave generates a proof <code className="text-mika-accent bg-mika-accent/10 px-1 rounded">π</code> asserting: <br/>
                  <span className="ml-6 block mt-1 text-xs border-l border-mika-accent/30 pl-2">a. The user controls the private key for address <code className="text-mika-accent">A</code>.</span>
                  <span className="ml-6 block mt-1 text-xs border-l border-mika-accent/30 pl-2">b. Address <code className="text-mika-accent">A</code> has a balance <code className="text-mika-accent">&gt;=</code> the transaction amount <code className="text-mika-accent">V</code>.</span>
                  <span className="ml-6 block mt-1 text-xs border-l border-mika-accent/30 pl-2">c. A nullifier <code className="text-mika-accent">N</code> is generated to prevent double-spending.</span>
                </li>
                <li>The proof <code className="text-mika-accent bg-mika-accent/10 px-1 rounded">π</code>, nullifier <code className="text-mika-accent bg-mika-accent/10 px-1 rounded">N</code>, and encrypted routing data are transmitted via NFC.</li>
              </ol>
            </div>
            <p className="leading-relaxed">
              The merchant terminal receives the payload and cryptographically verifies the proof in milliseconds. Because the proof is zero-knowledge, the terminal learns nothing about the user's actual balance or public address—only that the transaction is valid and fully funded.
            </p>
          </section>

          <section className="mb-16" id="offline-settlement">
            <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="text-mika-accent">03.</span> Offline Settlement (x402)
              <Zap className="w-6 h-6 text-mika-accent" />
            </h2>
            <p className="mb-6 leading-relaxed">
              A critical requirement for physical commerce is resilience against network outages. Mikachan implements the <strong>x402 Offline Settlement Protocol</strong> to ensure transactions can proceed even when the merchant terminal lacks internet connectivity.
            </p>
            <p className="mb-6 leading-relaxed">
              When offline, the terminal buffers the verified ZK-proofs and signed intents. The x402 protocol utilizes a localized optimistic rollup mechanism. The user's device provides a cryptographic commitment that the funds are locked for this specific transaction. 
            </p>
            <div className="border-l-2 border-mika-accent pl-6 py-2 my-8">
              <p className="text-mika-text italic">
                "The x402 standard guarantees that any buffered transaction possessing a valid ZK-proof and matching nullifier will be deterministically settled by the smart contract once connectivity is restored, eliminating chargeback risk for the merchant."
              </p>
            </div>
          </section>

          <section className="mb-16" id="smart-contracts">
            <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="text-mika-accent">04.</span> Autonomous Verification
              <Cpu className="w-6 h-6 text-mika-accent" />
            </h2>
            <p className="mb-6 leading-relaxed">
              Upon regaining connectivity, the merchant terminal submits the batch of buffered transactions to the Mikachan Settlement Contract on the decentralized ledger.
            </p>
            <ul className="list-disc list-outside ml-6 space-y-4 text-mika-text/70 mb-6">
              <li><strong className="text-mika-text">Batch Verification:</strong> The contract verifies the aggregated ZK-proofs in a single transaction, significantly reducing gas costs.</li>
              <li><strong className="text-mika-text">Nullifier Check:</strong> The contract checks the submitted nullifiers against the global state to prevent double-spending. If a nullifier exists, the specific transaction is rejected.</li>
              <li><strong className="text-mika-text">State Transition:</strong> Valid transactions trigger a state transition, transferring the locked funds from the user's shielded pool to the merchant's address.</li>
            </ul>
          </section>
          
          <section className="mb-16" id="conclusion">
            <h2 className="text-3xl font-space font-bold text-mika-text uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="text-mika-accent">05.</span> Conclusion
            </h2>
            <p className="leading-relaxed">
              Mikachan represents a paradigm shift in physical payments. By abstracting the complexities of blockchain interactions behind a familiar tap-to-pay interface, and securing it with state-of-the-art cryptography, we provide a system that is fundamentally more private, resilient, and equitable than legacy financial infrastructure.
            </p>
          </section>
        </div>
        
        {/* Footer of Whitepaper */}
        <div className="mt-24 pt-8 border-t border-mika-text/10 flex justify-between items-center font-mono text-sm text-mika-text/60">
          <span>Mikachan Protocol &copy; {new Date().getFullYear()}</span>
          <a href="#" className="hover:text-mika-accent transition-colors">Download PDF Version</a>
        </div>
      </article>
    </main>
  );
}
