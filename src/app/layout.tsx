import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL 
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, '')}` 
  : process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'https://neuralops-ai-saas.vercel.app';

export const metadata: Metadata = {
  title: 'NeuralOps — Premium Enterprise AI Inference & Multi-Agent Orchestration',
  description:
    'Deploy complex multi-agent workflows, process high-throughput vector pipelines, and run sub-50ms neural inference on globally distributed edge nodes. Enterprise-grade compliance and security out of the box.',
  keywords: [
    'AI SaaS',
    'Neural Inference',
    'AI Orchestrator',
    'Multi-Agent System',
    'Vector Database Pipeline',
    'Semantic Caching',
    'Enterprise LLM',
  ],
  authors: [{ name: 'NeuralOps Technologies' }],
  creator: 'NeuralOps Group',
  publisher: 'NeuralOps Group',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'NeuralOps — Premium Enterprise AI Inference Platform',
    description:
      'Deploy complex multi-agent workflows, process high-throughput vector pipelines, and run sub-50ms neural inference on globally distributed edge nodes.',
    url: siteUrl,
    siteName: 'NeuralOps',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NeuralOps Enterprise Platform Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralOps — Premium Enterprise AI Inference Platform',
    description:
      'Deploy complex multi-agent workflows, process high-throughput vector pipelines, and run sub-50ms neural inference on globally distributed edge nodes.',
    images: ['/og-image.jpg'],
    creator: '@neuralops_ai',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col bg-[#020617] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
