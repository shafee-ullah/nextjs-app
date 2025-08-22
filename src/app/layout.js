import ClientLayout from './layout-client';
import './globals.css';

export const metadata = {
  title: 'Next.js E-commerce',
  description: 'A simple e-commerce application built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
