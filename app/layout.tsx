import type { Metadata } from 'next';
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage, organize, and access your personal notes effortlessly.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}