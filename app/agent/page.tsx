'use client';

import WalletProvider from '@/components/WalletProvider';
import AgentChat from '@/components/AgentChat';

export default function AgentPage() {
  return (
    <WalletProvider>
      <AgentChat />
    </WalletProvider>
  );
}
