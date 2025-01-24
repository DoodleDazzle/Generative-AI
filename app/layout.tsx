
import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/CustomCursor'; // Import the CustomCursor component

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'CodeCollab AI - Collaborative Coding Platform',
  description: 'Write better code together with real-time collaboration, AI-powered suggestions, and deep analytics insights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CustomCursor /> {/* Add the CustomCursor component */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
