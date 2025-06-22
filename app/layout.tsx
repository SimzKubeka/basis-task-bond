/**
 * =============================================
 * File: layout.tsx (Root Layout)
 * Purpose:
 * This file defines the root layout for the entire application,
 * wrapping all pages and components. It applies global styles,
 * fonts, and shared components such as the toast notification system.
 *
 * Features:
 * - Applies Share Tech Mono font globally via Tailwind variable
 * - Sets the HTML language to English
 * - Wraps all children with a consistent layout structure
 * - Integrates `react-hot-toast` for global toast notifications
 * - Configures global toast appearance and behavior
 *
 * Notes:
 * - This layout is essential for applying app-wide context and styles
 * - Metadata is defined to support SEO and browser tab info
 * =============================================
 */

import type { Metadata } from 'next';
import { Share_Tech_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

const shareTechMono = Share_Tech_Mono({
  variable: '--font-share-tech-mono',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: '00 Mission Control',
  description: 'Mission Control for 00 Agents',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${shareTechMono.variable} antialiased`}>
        {children}
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
