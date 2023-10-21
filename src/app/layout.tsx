import type {Metadata} from 'next';

import {AppContextProvider} from '@/hooks/useApp';

import './globals.css';

export const metadata: Metadata = {
  title: 'DND Encounter Tracker',
  description: 'A small app to build and track encounters in DND 5e',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
