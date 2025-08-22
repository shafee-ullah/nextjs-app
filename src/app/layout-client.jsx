'use client';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { SessionProvider, useSession } from 'next-auth/react';
import LogoutButton from '@/components/LogoutButton';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
        <Link
          href="/dashboard/add-product"
          className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700  px-3 py-2 text-sm font-medium"
        >
          Add Product
        </Link>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
      <Link
        href="/login"
        className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="text-indigo-600 hover:text-indigo-800 px-3 py-2 text-sm font-medium"
      >
        Register
      </Link>
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo + Mobile Hamburger */}
          <div className="flex items-center">
             {/* Mobile Hamburger */}
             <button
              onClick={() => setIsOpen(!isOpen)}
              className=" sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="text-xl font-bold text-indigo-600">
              NextShop
            </Link>

           
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link
              href="/products"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Products
            </Link>
            <AuthButtons />
          </div>
        </div>
      </nav>

      {/* Mobile Menu (dropdown) */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          <Link
            href="/products"
            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
          >
            Products
          </Link>
          <AuthButtons />
        </div>
      )}
    </header>
  );
}

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SessionProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center font-bold text-indigo-600 text-lg mb-1">
                NextShop
              </p>
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} NextShop. All rights reserved.
              </p>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
