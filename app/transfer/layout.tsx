import WalletProvider from '@/components/WalletProvider';

export default function TransferLayout({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
