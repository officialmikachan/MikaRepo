import type {Metadata} from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Mikachan - Take Back Control of Payments',
  description: 'Mikachan powers private, offline-ready tap-to-pay for Web3. ZK-NFC transactions, x402-secured settlement, and autonomous payment verification—without intermediaries.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-mika-bg text-mika-text font-space antialiased selection:bg-mika-accent/30 selection:text-mika-text" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
