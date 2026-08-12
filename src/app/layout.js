import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: {
    default: 'Sunshine International Education Center',
    template: '%s |Education center',
  },
  description: 'Learn Japanese and study abroad with our comprehensive platform',
  keywords: ['Japanese', 'JLPT', 'Study Abroad', 'Language Learning', 'Japan'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Sunshine International Education Center',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Sunshine International Education Center',
      },
    ],
      icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}