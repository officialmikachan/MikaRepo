# Mikachan - Web3 Payment Platform

## Overview
A Next.js 15 Web3 tap-to-pay payment platform using Solana Mainnet. Features a landing page, real SOL transfer + claim system, AI payment agent, and an OpenClaw integration concept page.

## Architecture
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Replit built-in)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (framer-motion — NOT motion/react)
- **Blockchain**: Solana Mainnet via @solana/web3.js + wallet-adapter-react
- **AI**: OpenAI via Replit AI Integrations (AI_INTEGRATIONS_OPENAI_API_KEY / AI_INTEGRATIONS_OPENAI_BASE_URL)
- **Package Manager**: npm

## Project Structure
- `app/` - Next.js App Router pages
  - `page.tsx` - Landing page
  - `transfer/` - SOL transfer + claim page (WalletProvider wrapped)
  - `agent/` - AI Payment Agent page (WalletProvider wrapped)
  - `openclaw/` - OpenClaw × Mikachan integration concept page
  - `docs/` - Documentation page
  - `whitepaper/` - Whitepaper page
  - `api/deposit/` - Verifies SOL deposit tx, generates claim code
  - `api/claim/` - Processes claim code, sends SOL from pool wallet
  - `api/agent/` - OpenAI-powered NLP payment intent parser
- `components/` - Shared components
  - `Navbar.tsx`, `Hero.tsx`, `Features.tsx`, `HowItWorks.tsx`, `CTA.tsx`, `Footer.tsx`
  - `WalletProvider.tsx` - Solana wallet-adapter provider
  - `AgentChat.tsx` - AI payment agent chat UI
- `lib/db.ts` - PostgreSQL connection pool

## Features

### Transfer Feature (app/transfer)
- Connect Solana wallet (Phantom, etc.) via wallet-adapter
- Send SOL to server-side pool wallet → receive unique claim code (MIKA-XXXX-XXXX)
- Anyone with the code can claim the SOL to their wallet
- Deposits stored in PostgreSQL `deposits` table with atomic claim processing

### AI Payment Agent (app/agent)
- Natural language payment commands (e.g. "Send 0.1 SOL to [address] for coffee")
- OpenAI parses intent → returns structured JSON (action, amount, recipient, description)
- Payment confirmation card shows parsed details
- Connects to wallet → executes real Solana transfer
- Balance checking via natural language

### OpenClaw Integration Concept (app/openclaw)
- Presents Mikachan × OpenClaw autonomous payment agent concept
- Architecture flow, step-by-step explanation, use cases

## Database Schema
- `deposits` table: id, claim_code, amount_lamports, sender_address, tx_signature, claimer_address, claim_tx_signature, status, created_at, claimed_at

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `POOL_WALLET_SECRET` - Pool wallet private key (bs58)
- `NEXT_PUBLIC_POOL_WALLET` - Pool wallet public address
- `SOLANA_RPC_URL` - Custom Solana Mainnet RPC (server-side)
- `NEXT_PUBLIC_SOLANA_RPC_URL` - Custom Solana Mainnet RPC (client-side)
- `AI_INTEGRATIONS_OPENAI_API_KEY` - Replit AI Integrations OpenAI key
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - Replit AI Integrations OpenAI base URL

## Critical Notes
- All motion imports MUST use `framer-motion` (not `motion/react`) — critical for build
- Transfer and Agent pages use `<a href="/">` (not Next.js Link) for back-navigation
- next.config.ts has `transpilePackages: ['framer-motion']` and `devIndicators: false`
- Agent API uses `gpt-4o-mini` with `response_format: { type: 'json_object' }`
- Server runs on port 5000 at 0.0.0.0

## Running the App
```bash
npm run dev   # Development on port 5000
npm run build # Production build
npm run start # Production server on port 5000
```
